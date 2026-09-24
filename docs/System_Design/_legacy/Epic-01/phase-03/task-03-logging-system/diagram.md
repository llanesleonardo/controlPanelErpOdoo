# Logging system — Diagrams

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
flowchart LR
  Web[web]
  Gw[gateway]
  Orch[orchestrator]
  Files[LOG_DIR]
  Explorer[Log_explorer]
  Web -->|correlation_id| Gw
  Gw -->|correlation_id| Orch
  Gw --> Files
  Orch --> Files
  Explorer --> Gw
```
