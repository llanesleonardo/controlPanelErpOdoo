# Postgres Compose — Software Requirements Document (SRD)

**Status:** implemented (Epic-02)  
**Upstream:** [Epic-01 Docker](../../../Epic-01/phase-01/task-04-docker-compose-strategy/SRD.md) · [System_Design/Subsystem/SAC-009](../../../../Subsystem/SAC-009/README.md)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose

Make the control-plane PostgreSQL service reliably runnable via Docker Compose for local development, without requiring stub app containers.

## Scope

- Compose profile or override so `postgres` can start alone (`docker compose --profile db up` or separate `docker-compose.postgres.yml` — **default: Compose profiles**)
- Healthcheck on Postgres
- Document commands in System_Design/Subsystem/SAC-009 + docker/README
- Confirm `.env.example` DB vars work with Compose
- App services remain stubs and optional (not required to start DB)

## Out of Scope

- App container real builds
- Migrations / ORM schemas
- Production hardening beyond a basic healthcheck
- Starting Odoo in Compose

## Requirements

### SRD-E02-P01-T04-01

**DB-only up** — Developer shall start control-plane Postgres without building web/gateway/orchestrator images.

### SRD-E02-P01-T04-02

**Healthcheck** — Postgres service shall define a Docker healthcheck.

### SRD-E02-P01-T04-03

**Docs** — System_Design/Subsystem/SAC-009 and docker/README shall document the exact up/down commands.

### SRD-E02-P01-T04-04

**External Odoo** — Odoo remains outside Compose.
