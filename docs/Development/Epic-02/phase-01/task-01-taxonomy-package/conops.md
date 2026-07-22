# Taxonomy package — Concept of Operations (ConOps)

**Status:** planned (Epic-02 implementation)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Developer flow

1. Update TaxonomyDocs when vocabulary changes.
2. Update `packages/contracts` taxonomy exports to match.
3. Run package smoke test.
4. Future apps import `@control-panel-erp/contracts` (or workspace name chosen in task-03).

## Failure handling

Docs/code drift → fail CI smoke test listing missing codes.
