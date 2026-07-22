# Postgres Compose — Concept of Operations (ConOps)

**Status:** planned (Epic-02 implementation)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Developer flow

1. Copy `.env.example` → `.env` if needed.
2. From repo: `docker compose -f docker/docker-compose.yml up -d`.
3. Confirm healthy Postgres (`pg_isready` / Compose health).
4. Later epics connect gateway ORM to `CONTROLPLANE_DB_*`.
5. Optional: `docker compose --profile apps up` when app images exist.

## Failure handling

Port 5432 in use → change `CONTROLPLANE_DB_PORT` in `.env`. Missing Docker → install Engine/Desktop per Deployment docs.
