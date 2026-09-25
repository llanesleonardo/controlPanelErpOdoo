# @control-panel-ontology/contracts

Taxonomy constants and sample action-contract YAML for ControlPanelOntology.

**Authoring source:** [SAC-003 Authoring/ContractsDocs](../../../docs/System_Design/Subsystem/SAC-003/Authoring/ContractsDocs/) and [TaxonomyDocs](../../../docs/System_Design/Subsystem/SAC-003/Authoring/TaxonomyDocs/). After editing docs YAML, run:

```bash
npm run contracts:sync -w @control-panel-ontology/contracts
# or from this package:
npm run sync-schemas
```

## Usage

```js
import {
  DOMAINS,
  KNOWN_INTENT_CODES,
  isKnownIntentCode,
  loadContract,
} from '@control-panel-ontology/contracts';

isKnownIntentCode('sales.order.create'); // true
const inventory = loadContract('inventory.stock.adjust');
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm test -w @control-panel-ontology/contracts` | Smoke test |
| `npm run sync-schemas -w @control-panel-ontology/contracts` | Re-copy YAML from docs |

## Related

[SAC-003](../../../docs/System_Design/Subsystem/SAC-003/README.md) 
