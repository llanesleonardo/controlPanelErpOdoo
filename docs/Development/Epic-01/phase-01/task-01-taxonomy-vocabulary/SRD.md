# Taxonomy vocabulary — Software Requirements Document (SRD)

**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose
Publish a controlled vocabulary so intents map to known `domain.entity.verb` codes.

## Scope
- Domains, entities, verbs, result states, error classes
- Skill family mapping sketch
- Risk/approval sketch for MVP ops

## Out of Scope
- Full Odoo field-level mapping
- Runtime classifier ML model

## Requirements

### SRD-E01-phase-01-T01-01
**Core capability** — The system shall deliver the feature described in Purpose within the stated Scope.

| Trace | Link |
|-------|------|
| TSD | [TSD](./TSD.md#implements) |
| Diagram | [diagram](./diagram.md#implements) |
| ConOps | [conops](./conops.md#implements) |

### SRD-E01-phase-01-T01-02
**Observability** — Actions related to this feature shall carry `correlation_id` and `actor_id` where applicable.

### SRD-E01-phase-01-T01-03
**Scaffold constraint** — Implementation proceeds only after this pack is accepted; this docs pass does not ship production code for the feature.
