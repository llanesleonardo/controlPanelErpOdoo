# Storage and backups

## Storage (v1)

- **Local filesystem** under `STORAGE_ROOT` (default `./storage/local`)
- Compose: bind-mount or named volume pointing at that path
- **Linux later:** same env var; set to a host path (e.g. `/var/lib/controlpanel/storage`)

Use for uploads, export artifacts, and runbook attachments — not for Odoo filestore.

## Backups (planned)

| Target | Approach (sketch) |
|--------|-------------------|
| Control-plane Postgres | Scheduled `pg_dump` to backup directory / object storage later |
| File storage | Copy/rsync `STORAGE_ROOT` with retention policy |
| Odoo | Owned by Odoo ops — out of scope for this control-plane backup job |

## Rules

- Backups must not include `.env` in the same unencrypted tarball without access control
- Test restore periodically once jobs exist (Epic later)
