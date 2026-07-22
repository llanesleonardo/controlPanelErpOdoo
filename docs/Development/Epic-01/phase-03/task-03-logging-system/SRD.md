# Logging system — Software Requirements Document (SRD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [GatewayDocs](../../../../Components/GatewayDocs/README.md)

## Purpose

Define structured logging with correlation and actor IDs across gateway and orchestrator, plus a log explorer read path.

## Scope

- Structured logs (JSON lines or equivalent)
- Required fields: timestamp, level, service, message, `correlation_id`, `actor_id` when known
- Configurable `LOG_LEVEL`, `LOG_DIR`
- Log explorer panel (search by correlation_id)

## Out of Scope

- Full SIEM integration
- Infinite retention
- Implementing loggers in Epic-01

## Requirements

### SRD-E01-phase-03-T03-01

**Structured logs** — Gateway and orchestrator shall emit structured logs (later implementation).

### SRD-E01-phase-03-T03-02

**Propagation** — `correlation_id` shall propagate on outbound calls between services.

### SRD-E01-phase-03-T03-03

**Explorer** — Operators shall search logs by correlation_id in the control panel.

### SRD-E01-phase-03-T03-04

**Docs-only** — Epic-01 documents logging; code deferred.
