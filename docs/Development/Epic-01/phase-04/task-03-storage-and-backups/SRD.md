# Storage and backups — Software Requirements Document (SRD)

**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose
Local filesystem storage with path config for Linux; backup approach for control-plane data.

## Scope
- STORAGE_ROOT local volume
- Document Linux host path pattern
- Backup sketch for Postgres + files

## Out of Scope
- Offsite object storage (later)
- Odoo backup ownership

## Requirements

### SRD-E01-phase-04-T03-01
**Core capability** — The system shall deliver the feature described in Purpose within the stated Scope.

| Trace | Link |
|-------|------|
| TSD | [TSD](./TSD.md#implements) |
| Diagram | [diagram](./diagram.md#implements) |
| ConOps | [conops](./conops.md#implements) |

### SRD-E01-phase-04-T03-02
**Observability** — Actions related to this feature shall carry `correlation_id` and `actor_id` where applicable.

### SRD-E01-phase-04-T03-03
**Scaffold constraint** — Implementation proceeds only after this pack is accepted; this docs pass does not ship production code for the feature.
