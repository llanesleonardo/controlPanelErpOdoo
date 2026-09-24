# Storage and backups

## Storage (v1)

- **Local filesystem** under `STORAGE_ROOT` (default `./resources/storage/local`)
- Compose: bind-mount or named volume pointing at that path
- **Linux later:** same env var; set to a host path (e.g. `/var/lib/controlpanel/storage`)

Use for uploads, export artifacts, runbook attachments, and **dry-run / skill evidence** — **not** for the ERP (Odoo) filestore.

### Evidence layout (ops)

Dry-run and skill runs may write JSON under:

```text
STORAGE_ROOT/evidence/{correlation_id}/…
```

Task rows still hold the primary evidence blob; the file tree is the durable copy operators can open on disk. Path helpers must reject traversal outside `STORAGE_ROOT`. Full queue / log story: [SAC-007](../../SAC-007/README.md).

Structured **logs** are separate: `LOG_DIR` defaults to `./resources/logs` (not under `STORAGE_ROOT`).

## Backups (planned)

| Target | Approach (sketch) |
|--------|-------------------|
| Control-plane Postgres | Scheduled `pg_dump` to backup directory / object storage later |
| File storage | Copy/rsync `STORAGE_ROOT` with retention policy |
| Odoo / ERP | Owned by ERP ops — out of scope for this control-plane backup job |

## Rules

- Backups must not include `.env` in the same unencrypted tarball without access control  
- Test restore periodically once jobs exist  

Parent: [SAC-009](../README.md) · [SRD-DEP-007](../SRD.md)
