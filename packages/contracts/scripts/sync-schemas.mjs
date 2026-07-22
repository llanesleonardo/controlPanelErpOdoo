/**
 * Copy canonical YAML from docs/Components/ContractsDocs into this package.
 * Run from package or via: npm run contracts:sync -w @control-panel-erp/contracts
 */
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const docs = join(root, 'docs', 'Components', 'ContractsDocs');
const pkg = join(root, 'packages', 'contracts');

mkdirSync(join(pkg, 'schemas'), { recursive: true });
copyFileSync(join(docs, 'schemas', 'common.yaml'), join(pkg, 'schemas', 'common.yaml'));
copyFileSync(join(docs, 'sales.yaml'), join(pkg, 'sales.yaml'));
copyFileSync(join(docs, 'inventory.yaml'), join(pkg, 'inventory.yaml'));
copyFileSync(join(docs, 'accounting.yaml'), join(pkg, 'accounting.yaml'));
console.log('synced contracts schemas from docs/Components/ContractsDocs');
