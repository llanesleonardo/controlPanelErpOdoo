# Docker Compose strategy — Technical Specification Document (TSD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Artifacts

| Path | Role |
|------|------|
| [docker/docker-compose.yml](../../../../../docker/docker-compose.yml) | Service stubs |
| [Dockerfile.web/gateway/orchestrator](../../../../../docker/) | Placeholders |
| [docker-compose-strategy.md](../../../../Deployment/Docker/docker-compose-strategy.md) | Strategy |
| [secrets-and-env.md](../../../../Deployment/Docker/secrets-and-env.md) | Env categories |
| [storage-and-backups.md](../../../../Deployment/Docker/storage-and-backups.md) | Volumes / backups |

## Env categories (documented)

Control-plane DB, gateway, orchestrator, web, Odoo connector, storage, logs, `NODE_AUTH_TOKEN` (packages sync only).

## Notes

Apps remain unimplemented; Compose is documentation + stub wiring for a later epic.
