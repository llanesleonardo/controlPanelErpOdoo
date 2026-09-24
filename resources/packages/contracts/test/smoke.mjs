import assert from 'node:assert/strict';
import {
  KNOWN_INTENT_CODES,
  DOMAINS,
  isKnownIntentCode,
  loadContract,
  listContractNames,
} from '../src/index.js';

assert.ok(DOMAINS.includes('sales'));
assert.ok(isKnownIntentCode('sales.order.create'));
assert.ok(isKnownIntentCode('inventory.stock.adjust'));
assert.ok(isKnownIntentCode('accounting.invoice.post'));
assert.equal(KNOWN_INTENT_CODES.length >= 3, true);

for (const name of ['common', 'sales', 'inventory', 'accounting']) {
  const doc = loadContract(name);
  assert.equal(typeof doc, 'object');
}

const byIntent = loadContract('inventory.stock.adjust');
assert.ok(byIntent.components || byIntent.openapi);

assert.deepEqual(listContractNames().sort(), [
  'accounting',
  'common',
  'inventory',
  'sales',
].sort());

console.log('contracts smoke OK');
