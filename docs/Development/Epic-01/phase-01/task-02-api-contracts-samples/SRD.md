# API contracts samples — Software Requirements Document (SRD)

**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose
Define sample Intent/Task/Skill/Audit schemas for Sales, Inventory, and Accounting.

## Scope
- common.yaml primitives
- sales.order.create, inventory.stock.adjust, accounting.invoice.post samples
- Shared idempotency/timeout/approval annotations

## Out of Scope
- Generated clients
- Full top-20 catalog completion

## Requirements

### SRD-E01-phase-01-T02-01
**Core capability** — The system shall deliver the feature described in Purpose within the stated Scope.

| Trace | Link |
|-------|------|
| TSD | [TSD](./TSD.md#implements) |
| Diagram | [diagram](./diagram.md#implements) |
| ConOps | [conops](./conops.md#implements) |

### SRD-E01-phase-01-T02-02
**Observability** — Actions related to this feature shall carry `correlation_id` and `actor_id` where applicable.

### SRD-E01-phase-01-T02-03
**Scaffold constraint** — Implementation proceeds only after this pack is accepted; this docs pass does not ship production code for the feature.
