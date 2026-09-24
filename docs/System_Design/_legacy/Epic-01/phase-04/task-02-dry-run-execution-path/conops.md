# Dry-run execution path — Concept of Operations (ConOps)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow (future)

1. Operator selects dry-run in console.
2. System returns predicted effects; no Odoo write.
3. Operator may request commit; approval applied if over threshold.
4. Verification step confirms post-commit state.

## Failure handling

If simulate fails, task → `failed` with error class; no commit allowed until resolved.
