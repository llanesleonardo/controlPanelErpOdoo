# Auth users and roles — Diagrams

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
flowchart LR
  Browser[Next.js_web]
  Gw[NestJS_gateway]
  DB[(ControlPlane_Postgres)]
  Browser -->|login_credentials| Gw
  Gw -->|verify_hash_issue_session| DB
  Browser -->|authenticated_API| Gw
  Gw -->|RBAC_check| Gw
```
