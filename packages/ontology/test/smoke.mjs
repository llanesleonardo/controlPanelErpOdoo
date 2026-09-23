import assert from 'node:assert/strict';
import {
  listEntityTypeIds,
  loadEntityType,
  listEntityTypesCatalog,
  getEntityTypeCatalogDetail,
  loadBinding,
  validateOntology,
} from '../src/index.js';
import { isKnownIntentCode } from '@control-panel-erp/contracts';

assert.ok(listEntityTypeIds().length >= 12);

const estimate = loadEntityType('Estimate');
assert.equal(estimate.entity_type, 'Estimate');
assert.ok(estimate.links.some((l) => l.target === 'Contact'));
assert.ok(estimate.actions.some((a) => a.skill === 'sales.estimate.read'));
assert.ok(isKnownIntentCode('sales.estimate.read'));
assert.ok(isKnownIntentCode('sales.estimate.create'));

const contact = loadEntityType('Contact');
assert.ok(contact.actions.some((a) => a.id === 'create_estimate'));

const catalog = listEntityTypesCatalog();
assert.ok(catalog.some((e) => e.id === 'Estimate'));
assert.ok(catalog.some((e) => e.id === 'Contact'));
assert.ok(catalog.some((e) => e.id === 'ManufacturingOrder'));
assert.ok(catalog.some((e) => e.id === 'SctDocument'));
assert.ok(catalog.length >= 12);
assert.ok(!JSON.stringify(catalog).includes('customer.estimate'));

const detail = getEntityTypeCatalogDetail('Estimate');
assert.ok(detail.properties.length >= 1);
assert.ok(detail.actions.some((a) => a.id === 'read'));

const binding = loadBinding('odoo', 'Estimate');
assert.equal(binding.connector_id, 'odoo');
assert.equal(binding.vendor_model, 'customer.estimate');

const validated = validateOntology();
assert.ok(validated.entityTypes.includes('Estimate'));
assert.ok(validated.entityTypes.includes('Contact'));

console.log('ontology smoke OK', validated.entityTypes.sort().join(','));
