# Docker Compose strategy — Diagrams

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
flowchart LR
  Web[web_stub]
  Gw[gateway_stub]
  Orch[orchestrator_stub]
  PG[(postgres_controlplane)]
  Odoo[Odoo18_external]
  Web --> Gw
  Gw --> Orch
  Gw --> PG
  Orch --> PG
  Orch -.-> Odoo
```

Odoo is external; control-plane Postgres is the only DB in Compose.
