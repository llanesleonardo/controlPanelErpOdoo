# @control-panel-erp/contracts

Taxonomy constants and sample action-contract YAML for ControlPanelERP.

**Authoring source:** [docs/Components/ContractsDocs](../../docs/Components/ContractsDocs/) and [TaxonomyDocs](../../docs/Components/TaxonomyDocs/). After editing docs YAML, run:

```bash
npm run contracts:sync -w @control-panel-erp/contracts
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
} from '@control-panel-erp/contracts';

isKnownIntentCode('sales.order.create'); // true
const inventory = loadContract('inventory.stock.adjust');
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm test -w @control-panel-erp/contracts` | Smoke test |
| `npm run sync-schemas -w @control-panel-erp/contracts` | Re-copy YAML from docs |

## Epic

Implemented under [Epic-02 Phase 01](../../docs/Development/Epic-02/phase-01/).
