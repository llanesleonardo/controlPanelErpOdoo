# API contracts samples — Software Requirements Document (SRD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [ContractsDocs](../../../../Components/ContractsDocs/README.md)

## Purpose

Define sample Intent / Task / Skill / Audit-oriented schemas for Sales, Inventory, and Accounting so later implementation is contract-first.

## Scope

- `schemas/common.yaml` primitives (result states, error classes, observability)
- Samples: `sales.order.create`, `inventory.stock.adjust`, `accounting.invoice.post`
- Annotations: idempotency, timeout, retry, approval, verification, rollback
- Canonical home: `docs/Components/ContractsDocs/`

## Out of Scope

- Generated TypeScript/Python clients
- Full top-20 operation catalog
- Runtime schema validation in NestJS/FastAPI (later epic)

## Requirements

### SRD-E01-phase-01-T02-01

**Sample catalog** — The project shall publish OpenAPI-style YAML samples for at least one Sales, Inventory, and Accounting write operation plus shared common schemas.

### SRD-E01-phase-01-T02-02

**Shared policy fields** — Each sample shall document idempotency, timeout, retry, approval policy, expected output, verification, and rollback guidance.

### SRD-E01-phase-01-T02-03

**Observability** — Contracts shall include or reference `correlation_id` and `actor_id` via common Observability schema.

### SRD-E01-phase-01-T02-04

**Docs-only delivery** — Epic-01 delivers YAML references only; `packages/contracts` codegen is deferred.
