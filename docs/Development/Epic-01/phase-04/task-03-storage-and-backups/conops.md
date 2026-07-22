# Storage and backups — Concept of Operations (ConOps)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow (future)

1. Apps write artifacts under `STORAGE_ROOT`.
2. Ops schedules backups of Postgres + storage.
3. On Linux, point `STORAGE_ROOT` at a host path and mount it in Compose.
4. Periodically test restore.

## Failure handling

Disk full / permission errors surface as `dependency_failure` on write paths; alert ops.
