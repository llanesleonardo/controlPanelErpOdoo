# Deployment / Docker

**Unit of deploy:** Docker Compose for local development and for Linux production later.

## Model

1. **Local:** Docker Desktop / Engine + Compose; use `docker/docker-compose.yml` and root `.env` (from `.env.example`).
2. **Linux later:** Install Docker Engine + Docker Compose on the host; deploy the **same** Compose project with production `.env` and host-mounted volumes.
3. **v1:** No separate non-Docker Linux path — containers are the deployment unit.

Odoo is **external** (not started by this Compose file).

## Services (stub)

| Service | Image / build | Role |
|---------|---------------|------|
| `postgres` | postgres:16 | Control-plane DB only |
| `gateway` | Dockerfile.gateway | NestJS (stub) |
| `orchestrator` | Dockerfile.orchestrator | FastAPI (stub) |
| `web` | Dockerfile.web | Next.js (stub) |

Runtime stubs live in [`docker/`](../../../docker/).

## Docs in this folder

- [docker-compose-strategy.md](./docker-compose-strategy.md)
- [secrets-and-env.md](./secrets-and-env.md)
- [storage-and-backups.md](./storage-and-backups.md)

## Patterns package auth

GitHub Packages token (`NODE_AUTH_TOKEN`) is used for `npm run docs:sync-patterns`, not for Compose runtime. See root [README](../../../README.md).
