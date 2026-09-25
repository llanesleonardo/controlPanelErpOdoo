/**
 * Copy canonical YAML from SAC-003 Authoring ContractsDocs into this package.
 * Run from package or via: npm run contracts:sync -w @control-panel-ontology/contracts
 */
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// resources/packages/contracts/scripts → repo root (4 levels up)
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const docs = join(
  root,
  'docs',
  'System_Design',
  'Subsystem',
  'SAC-003',
  'Authoring',
  'ContractsDocs',
);
const pkg = join(root, 'resources', 'packages', 'contracts');

mkdirSync(join(pkg, 'schemas'), { recursive: true });
copyFileSync(join(docs, 'schemas', 'common.yaml'), join(pkg, 'schemas', 'common.yaml'));
copyFileSync(join(docs, 'sales.yaml'), join(pkg, 'sales.yaml'));
copyFileSync(join(docs, 'inventory.yaml'), join(pkg, 'inventory.yaml'));
copyFileSync(join(docs, 'accounting.yaml'), join(pkg, 'accounting.yaml'));
console.log(
  'synced contracts schemas from docs/System_Design/Subsystem/SAC-003/Authoring/ContractsDocs',
);
