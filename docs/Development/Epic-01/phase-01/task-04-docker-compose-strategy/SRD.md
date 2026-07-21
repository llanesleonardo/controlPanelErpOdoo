# Docker Compose strategy — Software Requirements Document (SRD)

**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose
Document Compose-as-deploy for local and Linux; provide stub compose/Dockerfiles.

## Scope
- Service list: web, gateway, orchestrator, postgres
- .env pattern
- External Odoo
- Volume sketch for storage/backups

## Out of Scope
- Production hardening
- Running full apps (stubs only)

## Requirements

### SRD-E01-phase-01-T04-01
**Core capability** — The system shall deliver the feature described in Purpose within the stated Scope.

| Trace | Link |
|-------|------|
| TSD | [TSD](./TSD.md#implements) |
| Diagram | [diagram](./diagram.md#implements) |
| ConOps | [conops](./conops.md#implements) |

### SRD-E01-phase-01-T04-02
**Observability** — Actions related to this feature shall carry `correlation_id` and `actor_id` where applicable.

### SRD-E01-phase-01-T04-03
**Scaffold constraint** — Implementation proceeds only after this pack is accepted; this docs pass does not ship production code for the feature.
