# Odoo Integration page — Software Requirements Document (SRD)

**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose
Admin UI to configure and health-check the Odoo 18 connector.

## Scope
- Store Odoo URL/DB/credentials in control-plane (encrypted at rest later)
- Test connection action
- Show connector status

## Out of Scope
- Embedding Odoo UI
- Multi-company advanced mapping UI

## Requirements

### SRD-E01-phase-04-T01-01
**Core capability** — The system shall deliver the feature described in Purpose within the stated Scope.

| Trace | Link |
|-------|------|
| TSD | [TSD](./TSD.md#implements) |
| Diagram | [diagram](./diagram.md#implements) |
| ConOps | [conops](./conops.md#implements) |

### SRD-E01-phase-04-T01-02
**Observability** — Actions related to this feature shall carry `correlation_id` and `actor_id` where applicable.

### SRD-E01-phase-04-T01-03
**Scaffold constraint** — Implementation proceeds only after this pack is accepted; this docs pass does not ship production code for the feature.
