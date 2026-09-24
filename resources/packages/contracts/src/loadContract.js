import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, '..');

/** @type {Record<string, string>} */
const NAME_TO_FILE = {
  common: join(PACKAGE_ROOT, 'schemas', 'common.yaml'),
  sales: join(PACKAGE_ROOT, 'sales.yaml'),
  inventory: join(PACKAGE_ROOT, 'inventory.yaml'),
  accounting: join(PACKAGE_ROOT, 'accounting.yaml'),
};

/** @type {Record<string, string>} */
const INTENT_TO_NAME = {
  'sales.order.create': 'sales',
  'inventory.stock.adjust': 'inventory',
  'accounting.invoice.post': 'accounting',
};

/**
 * Load a contract YAML document by short name (`sales`, `inventory`, `accounting`, `common`)
 * or by known intent_code.
 * @param {string} nameOrIntent
 * @returns {object}
 */
export function loadContract(nameOrIntent) {
  const name = INTENT_TO_NAME[nameOrIntent] ?? nameOrIntent;
  const filePath = NAME_TO_FILE[name];
  if (!filePath) {
    throw new Error(
      `Unknown contract "${nameOrIntent}". Use one of: ${Object.keys(NAME_TO_FILE).join(', ')} or a known intent_code.`,
    );
  }
  const raw = readFileSync(filePath, 'utf8');
  const doc = yaml.load(raw);
  if (!doc || typeof doc !== 'object') {
    throw new Error(`Contract file did not parse to an object: ${filePath}`);
  }
  return doc;
}

export function listContractNames() {
  return Object.keys(NAME_TO_FILE);
}
