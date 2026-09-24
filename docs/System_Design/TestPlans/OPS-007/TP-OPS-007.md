# TP-OPS-007 — Bring up the control-plane stack (Compose)

**Scenario:** OPS-007  
**SHALLs:** SRD-DEP-001 … SRD-DEP-009  
**Status:** Partial

## Method

1. Follow [OPS-007](../../Subsystem/SAC-009/Scenarios/OPS-007.md) and the [Compose runbook](../../Subsystem/SAC-009/Guides/Compose_and_Runbook.md).  
2. Prefer Postgres via Compose; apps either npm or `--profile apps`.  
3. Record pass/fail in Reports/.  

## Setup

- Docker Engine available  
- `.env` from `.env.example`  
- Optional: `ERP_MODE=simulate` so no live Odoo is required  

## Checks

| Check | Expect |
|-------|--------|
| `docker compose -f docker/docker-compose.yml ps` | Postgres healthy |
| `GET http://localhost:3001/health` (when gateway up) | OK |
| `http://localhost:3000` | UI loads |
| Compose services list | No Odoo container |

## Reports

Placeholder: [Reports/TR-OPS-007-01.md](./Reports/TR-OPS-007-01.md)
