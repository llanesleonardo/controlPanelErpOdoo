# Monorepo and docs shape — Software Requirements Document (SRD)

**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose
Lock repo layout: apps, packages, docker, and four docs roots (peopleForms-aligned).

## Scope
- Folder skeleton and stub READMEs
- Development Epic > Phase > Task convention
- Patterns sync wiring

## Out of Scope
- Application framework generation
- CI pipelines

## Requirements

### SRD-E01-phase-01-T03-01
**Core capability** — The system shall deliver the feature described in Purpose within the stated Scope.

| Trace | Link |
|-------|------|
| TSD | [TSD](./TSD.md#implements) |
| Diagram | [diagram](./diagram.md#implements) |
| ConOps | [conops](./conops.md#implements) |

### SRD-E01-phase-01-T03-02
**Observability** — Actions related to this feature shall carry `correlation_id` and `actor_id` where applicable.

### SRD-E01-phase-01-T03-03
**Scaffold constraint** — Implementation proceeds only after this pack is accepted; this docs pass does not ship production code for the feature.
