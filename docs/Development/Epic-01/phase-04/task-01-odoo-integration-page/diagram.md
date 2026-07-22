# Odoo Integration page — Diagrams

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
flowchart LR
  AdminUI[Integration_Odoo_page]
  Gw[Gateway]
  CPDB[(ControlPlane_DB)]
  Orch[Orchestrator]
  Odoo[Odoo18]
  AdminUI --> Gw
  Gw --> CPDB
  Gw -->|test| Orch
  Orch -->|JSON_RPC_or_XML_RPC| Odoo
```
