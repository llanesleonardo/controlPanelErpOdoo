# Taxonomy vocabulary — Software Requirements Document (SRD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [TaxonomyDocs](../../../../Subsystem/SAC-003/Authoring/TaxonomyDocs/README.md)

## Purpose

Publish a controlled vocabulary so human and OpenClaw intents map only to known `{domain}.{entity}.{verb}` codes.

## Scope

- Domains, entities, verbs, result states, error classes
- Skill family ? task family mapping sketch
- Risk / approval level sketch for MVP operations
- Canonical home: `docs/System_Design/Subsystem/SAC-003/Authoring/TaxonomyDocs/`

## Out of Scope

- Full Odoo field-level mapping
- Runtime NL classifier / ML model
- Application code that enforces taxonomy at runtime (later epic)

## Requirements

### SRD-E01-phase-01-T01-01

**Published vocabulary** — The project shall maintain a documented taxonomy covering domains, entities, verbs, result states, and error classes, linked from this task pack.

| Trace | Link |
|-------|------|
| TSD | [TSD](./TSD.md#implements) |
| Diagram | [diagram](./diagram.md#implements) |
| ConOps | [conops](./conops.md#implements) |

### SRD-E01-phase-01-T01-02

**Intent code shape** — Every executable operation shall be nameable as `{domain}.{entity}.{verb}` (e.g. `sales.order.create`).

### SRD-E01-phase-01-T01-03

**Approval levels** — Vocabulary docs shall define approval levels: `none`, `operator`, `manager`, `admin`.

### SRD-E01-phase-01-T01-04

**Docs-only delivery** — Epic-01 delivers documentation and scaffold references only; runtime enforcement is deferred.
