# Taxonomy package — Software Requirements Document (SRD)

## Status

implemented (Epic-02)

**Upstream:** [Epic-01 taxonomy](../../../Epic-01/phase-01/task-01-taxonomy-vocabulary/SRD.md) · [TaxonomyDocs](../../../../Components/TaxonomyDocs/README.md)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Delivered

- `packages/contracts/src/taxonomy.js` — domains, entities, verbs, states, errors, approval levels, known intent codes
- Exported via `@control-panel-erp/contracts`

## Purpose

Ship an importable package module that exposes the controlled vocabulary (domains, entities, verbs, result states, error classes, approval levels) for use by future gateway/orchestrator code.

## Scope

- TypeScript (and/or JSON) exports under `packages/contracts` or `packages/taxonomy` aligned with TaxonomyDocs
- Constants matching published intent-code shape `{domain}.{entity}.{verb}`
- Unit test or smoke assert that sample intent codes from docs exist
- README how to import

## Out of Scope

- Runtime NL intent classifier
- NestJS/FastAPI services
- Changing TaxonomyDocs meaning without docs update first

## Requirements

### SRD-E02-P01-T01-01

**Export vocabulary** — The package shall export domains, verbs, result states, error classes, and approval levels as typed constants or enums.

### SRD-E02-P01-T01-02

**Docs parity** — Exported values shall match [TaxonomyDocs](../../../../Components/TaxonomyDocs/README.md) (and vocabulary.md).

### SRD-E02-P01-T01-03

**Sample intents** — At least `sales.order.create`, `inventory.stock.adjust`, and `accounting.invoice.post` shall be representable / listed as known operation codes.

### SRD-E02-P01-T01-04

**No app runtime** — This task shall not create NestJS/Next.js/FastAPI applications.
