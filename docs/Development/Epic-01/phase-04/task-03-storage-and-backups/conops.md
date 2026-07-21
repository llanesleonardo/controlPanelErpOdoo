# Storage and backups — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow
1. App writes artifacts under STORAGE_ROOT.
2. Ops schedules backups.
3. On Linux, STORAGE_ROOT points at host path.

## Failure handling
On error: record structured failure (error class), surface message to operator, create incident when a write path fails.
