# Postgres Compose — Technical Specification Document (TSD)

**Status:** planned (Epic-02 implementation)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Default approach

In `docker/docker-compose.yml`:

- Add `profiles: ["apps"]` to `web`, `gateway`, `orchestrator` so default `docker compose up` starts **only postgres** (or use `profiles: ["db"]` on postgres and document `--profile db` — prefer **postgres always on; apps on profile `apps`**).
- Add healthcheck:

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER -d $$POSTGRES_DB"]
  interval: 5s
  timeout: 5s
  retries: 5
```

- Prefer `env_file: ../.env` with fallback defaults already present.

## Docs updates

- [docker/README.md](../../../../../docker/README.md)
- [Deployment/Docker/README.md](../../../../Deployment/Docker/README.md)

## Verify

`docker compose -f docker/docker-compose.yml up -d` → postgres healthy; `docker compose down` cleans up.
