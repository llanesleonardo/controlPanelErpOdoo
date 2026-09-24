# npm workspaces — Concept of Operations (ConOps)

**Status:** planned (Epic-02 implementation)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Developer flow

1. From repo root: `npm install`.
2. Import `@control-panel-erp/contracts` from future packages/apps.
3. Run `npm run lint` and package smoke tests from root scripts if added.

## Failure handling

Broken workspace paths → `npm install` fails; fix globs/package.json names.
