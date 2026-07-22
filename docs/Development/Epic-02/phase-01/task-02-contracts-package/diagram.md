# Contracts package — Diagrams

**Status:** planned (Epic-02 implementation)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
flowchart LR
  Author[ContractsDocs_YAML]
  Pkg[packages_contracts_schemas]
  Load[loadContract_helper]
  Consumer[Future_services]
  Author -->|copy_or_sync| Pkg
  Pkg --> Load
  Load --> Consumer
```
