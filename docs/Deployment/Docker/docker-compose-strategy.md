# Docker Compose strategy

## Goals

- One Compose definition for local and Linux.
- Control-plane services only; Odoo remains an external dependency.
- Volumes for Postgres and file storage; paths configurable via env.

## Environments

| Env | Notes |
|-----|--------|
| local | Developers copy `.env.example` → `.env`; stubs will not run full apps until implemented |
| linux | Install Docker Engine + Compose; same compose file; stronger secrets; host bind mounts for `STORAGE_ROOT` and backups |

## Networking (planned)

- `web` → `gateway`
- `gateway` → `orchestrator` and `postgres`
- `orchestrator` → `postgres` and external `ODOO_URL`

## Hardening (later)

- Non-root users in Dockerfiles
- Healthchecks
- Resource limits
- Secrets via files or secret manager (not plaintext in git)
