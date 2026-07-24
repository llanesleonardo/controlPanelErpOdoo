# Intent catalog & profiles — Software Requirements Document (SRD)

**Status:** implemented (Epic-05)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose

Give every ERP section a **unique, browsable intent list**, and make each intent’s **difficulty** and **call path** explicit so future skills (simple fetch vs diagnostic vs NL compose) stay **deterministic** — not ML-invented.

## Scope

- `apps/web/lib/section-intents.ts` — per-slug intent catalog
- Intent detail: objective, description, call-path diagram, execution profile, output table (dummy by default)
- Deterministic `classifyIntentProfile` (`simple` | `structured` | `diagnostic` | `nl_compose`)
- Example harder intents under Estimates: `find_issues`, `create_from_text` (catalog only)

## Out of Scope

- Executing diagnostic / NL compose skills (later epic)
- Syncing catalog from Odoo ir.model data automatically

## Requirements

### SRD-E05-T02-01

**Unique lists** — Each section slug shall map to its own intent codes; rails shall not share a global undifferentiated list.

### SRD-E05-T02-02

**Call path** — Intent detail shall show intent → app endpoint → adapter method → Odoo endpoint (sketch until ACL catalog is complete).

### SRD-E05-T02-03

**Profiles** — Difficulty shall be derived by explicit override or verb/suffix rules; reason string shall be visible for audit.

### SRD-E05-T02-04

**Dummy output** — Until a skill is live, output tables shall show deterministic dummy rows labeled simulate.
