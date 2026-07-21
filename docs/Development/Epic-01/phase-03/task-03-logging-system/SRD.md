# Logging system — Software Requirements Document (SRD)

**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose
Structured logging with correlation IDs across gateway and orchestrator.

## Scope
- Structured logs (JSON or equivalent)
- correlation_id / actor_id fields
- Log explorer panel (read path)
- Configurable LOG_DIR / level

## Out of Scope
- Full SIEM integration
- Infinite retention

## Requirements

### SRD-E01-phase-03-T03-01
**Core capability** — The system shall deliver the feature described in Purpose within the stated Scope.

| Trace | Link |
|-------|------|
| TSD | [TSD](./TSD.md#implements) |
| Diagram | [diagram](./diagram.md#implements) |
| ConOps | [conops](./conops.md#implements) |

### SRD-E01-phase-03-T03-02
**Observability** — Actions related to this feature shall carry `correlation_id` and `actor_id` where applicable.

### SRD-E01-phase-03-T03-03
**Scaffold constraint** — Implementation proceeds only after this pack is accepted; this docs pass does not ship production code for the feature.
