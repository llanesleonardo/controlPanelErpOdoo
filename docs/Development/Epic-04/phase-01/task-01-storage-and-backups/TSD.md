# Storage and backups — Technical Specification Document (TSD)

**Status:** implemented (Epic-04)
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

Epic-01 Phase 04 task-03 as runtime + ops script.

## Patterns applied

- [Observability](../../../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/06-observability.md) — durable evidence/artifacts beside structured logs
- [Health Checks](../../../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/09-health-checks.md) — optional readiness signal that `STORAGE_ROOT` is writable (gateway/orchestrator)

## Stack

| Piece | Choice |
|-------|--------|
| Env | `STORAGE_ROOT=./storage/local` (Linux later: host path) |
| Library | Small shared helper in gateway + orchestrator (or `packages/` util later) |
| Layout | `STORAGE_ROOT/evidence/{correlation_id}/…`, `STORAGE_ROOT/backups/` |
| Script | `scripts/backup-controlplane.sh` (+ `.ps1` note for Windows operators) |
| Compose | Named/bind volume for `STORAGE_ROOT` when `--profile apps` |

## API / behavior

- No public HTTP API required for MVP beyond internal use by dry-run evidence writer.
- Backup script inputs: `DATABASE_URL` or Compose Postgres env; outputs timestamped dump + tar under `STORAGE_ROOT/backups/` (or `./backups/` outside the tree if preferred — **lock:** write under `STORAGE_ROOT/backups/` and document retention).

## Security

- Never copy `.env`, `.env.local`, or `ODOO_*` plaintext files into the archive.
- Backup directory mode should be operator-restricted on Linux later.
