# Deployment / Docker

**Unit of deploy:** Docker Compose for local development and for Linux production later.

## Model

1. **Local:** Docker Desktop / Engine + Compose; use `docker/docker-compose.yml` and root `.env` (from `.env.example`).
2. **Linux later:** Install Docker Engine + Docker Compose on the host; deploy the **same** Compose project with production `.env` and host-mounted volumes.
3. **v1:** No separate non-Docker Linux path — containers are the deployment unit.

Odoo is **external** (not started by this Compose file).

## Services

| Service | Image / build | Role | Default |
|---------|---------------|------|---------|
| `postgres` | postgres:16 | Control-plane DB only (host port **5433** by default) | **starts with `compose up`** |
| `gateway` | Dockerfile.gateway | NestJS ops API + ERP connector BFF | profile `apps` |
| `orchestrator` | Dockerfile.orchestrator | FastAPI dry-run skills | profile `apps` |
| `web` | Dockerfile.web | Next.js control panel | profile `apps` |

### Commands

```bash
# Postgres only (Epic-02)
docker compose -f docker/docker-compose.yml up -d

# Include stub app containers
docker compose -f docker/docker-compose.yml --profile apps up -d

docker compose -f docker/docker-compose.yml down
```

Runtime files live in [`docker/`](../../../docker/).

## Docs in this folder

- [docker-compose-strategy.md](./docker-compose-strategy.md)
- [secrets-and-env.md](./secrets-and-env.md)
- [storage-and-backups.md](./storage-and-backups.md)

## Patterns package auth

GitHub Packages token (`NODE_AUTH_TOKEN`) is used for `npm run docs:sync-patterns`, not for Compose runtime. See root [README](../../../README.md).
