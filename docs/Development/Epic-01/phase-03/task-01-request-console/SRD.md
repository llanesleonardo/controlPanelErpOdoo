# Request console — Software Requirements Document (SRD)

**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose
UI to submit intents with domain and dry-run vs commit.

## Scope
- Intent entry
- Domain / taxonomy selection
- Dry-run or commit mode
- Show classification result before execute

## Out of Scope
- Full natural-language freeform without taxonomy
- Auto-commit high-risk ops

## Requirements

### SRD-E01-phase-03-T01-01
**Core capability** — The system shall deliver the feature described in Purpose within the stated Scope.

| Trace | Link |
|-------|------|
| TSD | [TSD](./TSD.md#implements) |
| Diagram | [diagram](./diagram.md#implements) |
| ConOps | [conops](./conops.md#implements) |

### SRD-E01-phase-03-T01-02
**Observability** — Actions related to this feature shall carry `correlation_id` and `actor_id` where applicable.

### SRD-E01-phase-03-T01-03
**Scaffold constraint** — Implementation proceeds only after this pack is accepted; this docs pass does not ship production code for the feature.
