# Storage and backups — Diagrams

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
flowchart LR
  Apps[gateway_orchestrator_web]
  Store[STORAGE_ROOT]
  PG[(ControlPlane_Postgres)]
  Backup[Backup_job]
  Apps --> Store
  Apps --> PG
  Backup --> Store
  Backup --> PG
```
