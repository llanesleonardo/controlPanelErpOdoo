# docker/

Docker Compose for local development and the same model on Linux later (install Docker Engine + Compose on the server).

| File | Purpose |
|------|---------|
| [docker-compose.yml](./docker-compose.yml) | Postgres by default; apps via `--profile apps` |
| [Dockerfile.web](./Dockerfile.web) | Next.js control panel |
| [Dockerfile.gateway](./Dockerfile.gateway) | NestJS gateway (COPY `resources/packages/*`) |
| [Dockerfile.orchestrator](./Dockerfile.orchestrator) | FastAPI orchestrator |

Docs: [SAC-009](../docs/System_Design/Subsystem/SAC-009/README.md) · [Compose runbook](../docs/System_Design/Subsystem/SAC-009/Guides/Compose_and_Runbook.md)

## Commands

```bash
# from repo root — control-plane Postgres only
docker compose -f docker/docker-compose.yml up -d

# optional app containers
docker compose -f docker/docker-compose.yml --profile apps up -d --build

docker compose -f docker/docker-compose.yml down
```

Copy [../.env.example](../.env.example) to `.env` before using env_file-based app services. Postgres uses Compose defaults or `CONTROLPLANE_DB_*` from the environment.
