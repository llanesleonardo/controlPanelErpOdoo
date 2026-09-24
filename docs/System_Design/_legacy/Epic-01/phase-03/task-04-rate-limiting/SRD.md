# Rate limiting — Software Requirements Document (SRD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [GatewayDocs](../../../../Subsystem/SAC-001/README.md)

## Purpose

Define gateway rate limiting to protect the control plane from abuse and accidental floods.

## Scope

- Per-user and/or per-IP limits
- Env-configurable window and max
- Clear HTTP 429 responses
- Documented defaults in `.env.example`

## Out of Scope

- Adaptive global mesh / distributed rate limits across regions
- Implementing NestJS throttling in Epic-01

## Requirements

### SRD-E01-phase-03-T04-01

**Configurable limits** — `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX` shall drive gateway policy.

### SRD-E01-phase-03-T04-02

**429 response** — Exceeding the limit shall return 429 with a clear message.

### SRD-E01-phase-03-T04-03

**Auth-aware** — Prefer per-authenticated-user buckets when logged in; fall back to IP.

### SRD-E01-phase-03-T04-04

**Docs-only** — Epic-01 documents policy; middleware deferred.
