# Dry-run execution path — Software Requirements Document (SRD)

**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose
Every write skill supports dry-run before commit.

## Scope
- execution_mode dry_run|commit on contracts
- Dry-run returns predicted effects without Odoo commit
- UI forces dry-run option on high-risk intents

## Out of Scope
- Full digital twin of Odoo

## Requirements

### SRD-E01-phase-04-T02-01
**Core capability** — The system shall deliver the feature described in Purpose within the stated Scope.

| Trace | Link |
|-------|------|
| TSD | [TSD](./TSD.md#implements) |
| Diagram | [diagram](./diagram.md#implements) |
| ConOps | [conops](./conops.md#implements) |

### SRD-E01-phase-04-T02-02
**Observability** — Actions related to this feature shall carry `correlation_id` and `actor_id` where applicable.

### SRD-E01-phase-04-T02-03
**Scaffold constraint** — Implementation proceeds only after this pack is accepted; this docs pass does not ship production code for the feature.
