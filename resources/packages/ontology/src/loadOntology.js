import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { isKnownIntentCode } from '@control-panel-ontology/contracts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = path.resolve(__dirname, '..');
const ENTITY_DIR = path.join(PKG_ROOT, 'entity-types');
const BINDINGS_DIR = path.join(PKG_ROOT, 'bindings');
const CONNECTORS_CATALOG = path.join(PKG_ROOT, 'catalog', 'connectors.yaml');

/**
 * @param {string} filePath
 */
function loadYamlFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return yaml.load(raw);
}

/**
 * @returns {string[]}
 */
export function listEntityTypeIds() {
  if (!fs.existsSync(ENTITY_DIR)) return [];
  return fs
    .readdirSync(ENTITY_DIR)
    .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
    .map((f) => path.basename(f, path.extname(f)));
}

/**
 * @param {string} id
 */
export function loadEntityType(id) {
  const base = String(id || '').trim();
  if (!base) throw new Error('entity type id required');
  const candidates = [
    path.join(ENTITY_DIR, `${base}.yaml`),
    path.join(ENTITY_DIR, `${base}.yml`),
    path.join(ENTITY_DIR, `${base.toLowerCase()}.yaml`),
    path.join(ENTITY_DIR, `${base.toLowerCase()}.yml`),
  ];
  const file = candidates.find((p) => fs.existsSync(p));
  if (!file) throw new Error(`Unknown entity type: ${id}`);
  const doc = loadYamlFile(file);
  validateEntityType(doc);
  return doc;
}

/**
 * @param {unknown} doc
 */
function validateEntityType(doc) {
  if (!doc || typeof doc !== 'object') {
    throw new Error('entity type must be an object');
  }
  const et = /** @type {Record<string, unknown>} */ (doc);
  if (!et.entity_type || typeof et.entity_type !== 'string') {
    throw new Error('entity_type string required');
  }
  if (!Array.isArray(et.properties)) {
    throw new Error(`${et.entity_type}: properties array required`);
  }
  if (!Array.isArray(et.links)) {
    throw new Error(`${et.entity_type}: links array required`);
  }
  if (!Array.isArray(et.actions)) {
    throw new Error(`${et.entity_type}: actions array required`);
  }
  for (const action of et.actions) {
    if (!action || typeof action !== 'object') {
      throw new Error(`${et.entity_type}: invalid action`);
    }
    const a = /** @type {Record<string, unknown>} */ (action);
    if (!a.id || !a.skill) {
      throw new Error(`${et.entity_type}: action requires id and skill`);
    }
    const skill = String(a.skill);
    if (!isKnownIntentCode(skill)) {
      throw new Error(
        `${et.entity_type}: action skill "${skill}" not in contracts taxonomy`,
      );
    }
  }
}

/**
 * Public catalog shape — no vendor bindings.
 */
export function listEntityTypesCatalog() {
  return listEntityTypeIds().map((fileId) => {
    const doc = loadEntityType(fileId);
    return {
      id: doc.entity_type,
      label: doc.label || doc.entity_type,
      description: doc.description || '',
      properties: doc.properties || [],
      links: doc.links || [],
      actions: (doc.actions || []).map((a) => ({
        id: a.id,
        label: a.label || a.id,
        skill: a.skill,
        description: a.description || '',
      })),
    };
  });
}

/**
 * @param {string} id
 */
export function getEntityTypeCatalogDetail(id) {
  const doc = loadEntityType(id);
  return {
    id: doc.entity_type,
    label: doc.label || doc.entity_type,
    description: doc.description || '',
    properties: doc.properties || [],
    links: doc.links || [],
    actions: (doc.actions || []).map((a) => ({
      id: a.id,
      label: a.label || a.id,
      skill: a.skill,
      description: a.description || '',
    })),
  };
}

/**
 * Product-owned peer catalog (SoA / data / logic).
 * @returns {{ connectors: Record<string, unknown>[] }}
 */
export function loadConnectorsCatalog() {
  if (!fs.existsSync(CONNECTORS_CATALOG)) {
    return { connectors: [] };
  }
  const doc = loadYamlFile(CONNECTORS_CATALOG);
  const connectors = Array.isArray(doc?.connectors) ? doc.connectors : [];
  return { connectors };
}

/**
 * @param {string} connectorId
 * @param {string} entityType
 */
export function loadBinding(connectorId, entityType) {
  const c = String(connectorId || '').trim();
  const e = String(entityType || '').trim();
  const candidates = [
    path.join(BINDINGS_DIR, c, `${e}.yaml`),
    path.join(BINDINGS_DIR, c, `${e.toLowerCase()}.yaml`),
  ];
  const file = candidates.find((p) => fs.existsSync(p));
  if (!file) throw new Error(`No binding for ${c}/${e}`);
  return loadYamlFile(file);
}

/**
 * Validate all entity types (and that Estimate has odoo binding).
 */
export function validateOntology() {
  const ids = listEntityTypeIds();
  if (ids.length === 0) throw new Error('no entity types found');
  const loaded = ids.map((id) => loadEntityType(id));
  const estimate = loaded.find((d) => d.entity_type === 'Estimate');
  if (!estimate) throw new Error('Estimate entity type required');
  loadBinding('odoo', 'Estimate');
  return { entityTypes: loaded.map((d) => d.entity_type) };
}
