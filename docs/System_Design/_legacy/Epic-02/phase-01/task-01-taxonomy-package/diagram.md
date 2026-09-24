# Taxonomy package — Diagrams

**Status:** planned (Epic-02 implementation)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
flowchart LR
  Docs[TaxonomyDocs]
  Pkg[packages_contracts_taxonomy]
  FutureGw[Future_gateway]
  FutureOrch[Future_orchestrator]
  Docs -->|author_sync| Pkg
  Pkg --> FutureGw
  Pkg --> FutureOrch
```
