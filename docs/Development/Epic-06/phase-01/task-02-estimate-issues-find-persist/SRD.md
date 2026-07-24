# Estimate issues find & persist — Software Requirements Document (SRD)

**Status:** not started  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose

Give operators a **governed diagnose path** on the Odoo connector: find estimate data issues, persist them in the control plane, without free-form Odoo writes.

## Scope

- Skill/API to find estimate issues via orchestrator → Odoo estimate adapter  
- Persist issue rows in control-plane Postgres  
- Evidence / correlation on the find run  

## Out of Scope

- UI list/dismiss (task-03)  
- Auto-fix / mutate estimates  
- Non-Odoo connectors  

## Requirements

### SRD-E06-T02-01

**Find** — An authenticated operator (dev-actor) shall be able to trigger find-issues for estimates through the gateway.

### SRD-E06-T02-02

**Persist** — Found issues shall be stored in control-plane Postgres with stable ids and status (e.g. open).

### SRD-E06-T02-03

**ACL** — Persistence DTOs shall not require Odoo model names in the UI/API contract.

### SRD-E06-T02-04

**Modes** — `simulate` shall return deterministic dummy issues without calling Odoo; `live` uses the Odoo connector.
