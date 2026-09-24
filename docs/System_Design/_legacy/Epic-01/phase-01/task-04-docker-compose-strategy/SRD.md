# Docker Compose strategy — Software Requirements Document (SRD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [System_Design/Subsystem/SAC-009](../../../../Subsystem/SAC-009/README.md)

## Purpose

Document Docker Compose as the unit of deploy for local and Linux; keep stub compose/Dockerfiles aligned with that strategy.

## Scope

- Services: `web`, `gateway`, `orchestrator`, `postgres` (control-plane DB)
- `.env` / `.env.example` secret pattern
- Odoo external (not in Compose)
- Storage / backup volume sketch
- Same Compose model on Linux after Docker install

## Out of Scope

- Production hardening (non-root, healthchecks, resource limits) — later
- Running full application containers (stubs sleep/placeholder only)
- Shipping a live control panel stack in Epic-01

## Requirements

### SRD-E01-phase-01-T04-01

**Compose documented** — System_Design/Subsystem/SAC-009 docs shall describe local + Linux Compose strategy and service list.

### SRD-E01-phase-01-T04-02

**Secrets pattern** — Env vars shall be documented via `.env.example`; real secrets never committed.

### SRD-E01-phase-01-T04-03

**Stub artifacts** — `docker/docker-compose.yml` and placeholder Dockerfiles shall exist and match the documented service list.

### SRD-E01-phase-01-T04-04

**External Odoo** — Compose shall not start Odoo; connector URL comes from env.
