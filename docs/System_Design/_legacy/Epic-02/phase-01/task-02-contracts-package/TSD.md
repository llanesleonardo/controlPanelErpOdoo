# Contracts package — Technical Specification Document (TSD)

**Status:** planned (Epic-02 implementation)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Layout

```
packages/contracts/
  package.json
  src/taxonomy.ts
  src/loadContract.ts
  src/index.ts
  schemas/
    common.yaml
    sales.yaml
    inventory.yaml
    accounting.yaml
  README.md
```

## Dependencies

- `js-yaml` (or equivalent) for Node load helper
- TypeScript build optional; can ship as plain JS/TS with `"type": "module"`

## Sync note

Document in README: when ContractsDocs change, re-copy into `packages/contracts/schemas/` (script optional: `npm run contracts:sync` copying from docs).
