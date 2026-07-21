# docker/

Stub Docker Compose for local development and the same Compose model on Linux later (install Docker Engine + Compose on the server).

**Status:** scaffold stubs only — not production-hardened.

| File | Purpose |
|------|---------|
| [docker-compose.yml](./docker-compose.yml) | Service list: web, gateway, orchestrator, postgres |
| [Dockerfile.web](./Dockerfile.web) | Placeholder for Next.js |
| [Dockerfile.gateway](./Dockerfile.gateway) | Placeholder for NestJS |
| [Dockerfile.orchestrator](./Dockerfile.orchestrator) | Placeholder for FastAPI |

See [docs/Deployment/Docker](../docs/Deployment/Docker/README.md).

Copy [../.env.example](../.env.example) to `.env` before attempting `docker compose up` (apps are stubs — stack will not fully run until implemented).
