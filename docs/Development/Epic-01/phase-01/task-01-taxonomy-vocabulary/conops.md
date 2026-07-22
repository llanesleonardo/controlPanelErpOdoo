# Taxonomy vocabulary — Concept of Operations (ConOps)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator / author flow

1. Business ops / ERP owner proposes a new operation.
2. Author adds or updates entries in TaxonomyDocs (domain, entity, verb, approval sketch).
3. Contract author adds a matching contract under ContractsDocs when the operation is executable.
4. Platform owner maps the code to an allowlisted skill family (later epic).

## Failure handling

Unknown or undocumented intents are rejected at classification time (later runtime). In Epic-01, gaps are fixed by updating docs before any implementation starts.
