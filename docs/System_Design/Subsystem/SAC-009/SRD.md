# SAC-009 — Software Requirements (SRD)

Plain deploy rules for the carbide-shop control panel. **ERP** = enterprise resource planning system (Odoo today).

## Scope

- Docker Compose as the unit of deploy (local and Linux later)
- Control-plane services only; ERP / other systems of record stay external
- Secrets, volumes, and a documented bring-up path

## Out of scope

- Hosting Odoo inside this Compose file
- A second application API gateway in front of NestJS (optional host TLS/WAF only)
- Full production backup automation (sketched only)

## Requirements

### SRD-DEP-001 — One Compose definition

The product SHALL use a single Compose definition for local development and for Linux later, with environment differing by `.env` and mounts — not by a second Compose tree for v1.

### SRD-DEP-002 — Control-plane only

Compose SHALL start control-plane services (Postgres, and optionally web / gateway / orchestrator). External systems of record (including Odoo) SHALL remain outside this Compose file and be reached via connector URLs.

### SRD-DEP-003 — Postgres by default

`docker compose … up` WITHOUT profiles SHALL start control-plane Postgres. Application containers SHALL be optional via Compose profile `apps` (or host npm processes).

### SRD-DEP-004 — Public vs private services

When apps run in Compose, **web** and **gateway** MAY be published to the host. **Orchestrator** and **Postgres** SHALL NOT be treated as public internet endpoints; orchestrator stays on the internal network.

### SRD-DEP-005 — Gateway image includes ontology

The gateway Docker image SHALL include ontology and contracts from `resources/packages/` so catalog APIs work in container runs.

### SRD-DEP-006 — Secrets not in git

Secrets SHALL live in `.env` (or a secret manager later), never committed. `.env.example` SHALL list variable names and placeholders only.

### SRD-DEP-007 — Configurable storage

File storage for evidence / uploads SHALL use `STORAGE_ROOT` (local path or host bind mount on Linux). Control-plane backups SHALL NOT silently bundle `.env` into an unencrypted archive without access control.

### SRD-DEP-008 — Documented bring-up

Operators SHALL have a documented checklist to start Postgres → schema → orchestrator → gateway → web (or the apps profile) and smoke-check health endpoints.

### SRD-DEP-009 — Edge

NestJS gateway SHALL remain the application API entry. Optional TLS / WAF on the host SHALL sit outside Compose and SHALL NOT add a second Nest-style gateway.

## Trace

| ID | Scenario | Test plan |
|----|----------|-----------|
| SRD-DEP-001 … 009 | [OPS-007](./Scenarios/OPS-007.md) | [TP-OPS-007](../../TestPlans/OPS-007/TP-OPS-007.md) |
