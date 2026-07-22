# Dry-run execution path — Software Requirements Document (SRD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [reliability-rules](../../../reliability-rules.md) · [request-lifecycle](../../../request-lifecycle.md)

## Purpose

Define that every write skill supports `dry_run` before `commit`, returning predicted effects without mutating Odoo.

## Scope

- `execution_mode`: `dry_run` | `commit` on contracts
- Dry-run returns structured evidence / predicted side effects
- UI exposes dry-run option; high-risk intents prefer dry-run first
- Commit path still subject to approval thresholds

## Out of Scope

- Full digital twin of Odoo
- Implementing orchestrator dry-run handlers in Epic-01

## Requirements

### SRD-E01-phase-04-T02-01

**Mode required** — Write contracts shall include `execution_mode`.

### SRD-E01-phase-04-T02-02

**Dry-run safety** — `dry_run` shall not persist business changes in Odoo.

### SRD-E01-phase-04-T02-03

**Evidence** — Dry-run responses shall include structured predicted effects and warnings.

### SRD-E01-phase-04-T02-04

**Lifecycle** — Dry-run sits before approval/execute in the documented lifecycle.

### SRD-E01-phase-04-T02-05

**Docs-only** — Epic-01 documents the path; runtime deferred.
