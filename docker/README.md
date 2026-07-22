# docker/

Docker Compose for local development and the same model on Linux later (install Docker Engine + Compose on the server).

| File | Purpose |
|------|---------|
| [docker-compose.yml](./docker-compose.yml) | Postgres by default; app stubs via `--profile apps` |
| [Dockerfile.web](./Dockerfile.web) | Placeholder for Next.js |
| [Dockerfile.gateway](./Dockerfile.gateway) | Placeholder for NestJS |
| [Dockerfile.orchestrator](./Dockerfile.orchestrator) | Placeholder for FastAPI |

See [docs/Deployment/Docker](../docs/Deployment/Docker/README.md).

## Commands

```bash
# from repo root — control-plane Postgres only
docker compose -f docker/docker-compose.yml up -d

# optional stub app containers (placeholders)
docker compose -f docker/docker-compose.yml --profile apps up -d

docker compose -f docker/docker-compose.yml down
```

Copy [../.env.example](../.env.example) to `.env` before using env_file-based app services. Postgres uses Compose defaults or `CONTROLPLANE_DB_*` from the environment.
