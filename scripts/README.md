# Control-plane backup

## Linux / macOS / Git Bash

```bash
export DATABASE_URL=postgresql://controlpanel:change-me@localhost:5433/controlpanel
export STORAGE_ROOT=./storage/local
bash scripts/backup-controlplane.sh
```

Requires `pg_dump` on PATH.

## Windows (PowerShell note)

Prefer WSL or Git Bash for the shell script. Do not pack `.env` / `.env.local` into backup archives.

## What is backed up

- Control-plane Postgres (`pg_dump` custom format)
- `STORAGE_ROOT` contents except nested `backups/` and env files

Odoo filestore is out of scope.
