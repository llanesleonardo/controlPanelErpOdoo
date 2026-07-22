# Storage and backups — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Operator flow

1. Set `STORAGE_ROOT` in `.env` (default `./storage/local`).
2. Start gateway/orchestrator — directories are created on boot if missing.
3. After dry-runs, inspect `STORAGE_ROOT/evidence/<correlation_id>/` for JSON artifacts when written.
4. Run `scripts/backup-controlplane` periodically; store bundles off-box; never email unencrypted dumps with DB roles.

## Failure modes

- Disk full → dry-run evidence write fails; task should still keep inline JSON output when possible and log `dependency_failure`.
- Wrong `STORAGE_ROOT` permissions → health/ready check reports degraded.
