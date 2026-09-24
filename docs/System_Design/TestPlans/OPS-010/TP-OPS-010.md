# TP-OPS-010 — Classify / resolve known intent code against taxonomy

**Scenario:** OPS-010  
**SHALLs:** SRD-TAX-001 … 008 · SRD-CTR-001 … 007  
**Status:** Not run

## Method

1. Follow [OPS-010](../../Subsystem/SAC-003/Scenarios/OPS-010.md).  
2. Prefer package smoke: `npm test -w @control-panel-erp/contracts`.  
3. After editing Authoring ContractsDocs, run sync and re-test.  
4. Record pass/fail in Reports/.

## Setup

- Repo checkout with `resources/packages/contracts`  
- Node/npm workspaces available  

## Checks

| Check | Expect |
|-------|--------|
| `isKnownIntentCode('sales.order.create')` | true |
| `isKnownIntentCode('inventory.stock.adjust')` | true |
| `isKnownIntentCode('accounting.invoice.post')` | true |
| `isKnownIntentCode('not.a.real.code')` | false |
| `loadContract('inventory.stock.adjust')` | parses object |
| `npm run sync-schemas -w @control-panel-erp/contracts` | copies Authoring YAML |

## Reports

Placeholder: [Reports/TR-OPS-010-01.md](./Reports/TR-OPS-010-01.md)
