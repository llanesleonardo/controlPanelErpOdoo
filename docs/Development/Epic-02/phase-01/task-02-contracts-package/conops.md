# Contracts package — Concept of Operations (ConOps)

**Status:** planned (Epic-02 implementation)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Developer flow

1. Edit ContractsDocs YAML (authoring).
2. Sync/copy into `packages/contracts/schemas`.
3. Import `loadContract('inventory')` (or by intent) in future services.
4. Run package smoke test that files parse as YAML.

## Failure handling

Missing/invalid YAML → loader throws clear error; CI fails smoke test.
