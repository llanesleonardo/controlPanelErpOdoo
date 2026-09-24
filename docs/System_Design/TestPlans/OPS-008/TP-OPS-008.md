# TP-OPS-008 — Run an allowlisted skill through the skills engine

**Scenario:** OPS-008  
**SHALLs:** SRD-SKL-001 … 012  
**Status:** Not run

## Method

1. Follow [OPS-008](../../Subsystem/SAC-004/Scenarios/OPS-008.md).  
2. Prefer `ERP_MODE=simulate` first; use live only with valid Odoo env.  
3. Record pass/fail in Reports/.  
4. Keep correlation ids when skills run.

## Setup

- Orchestrator on port 8000 (npm or Compose profile `apps`)  
- Gateway + web for UI path, or curl orchestrator on host for engine-only smoke  
- `STORAGE_ROOT` writable  

## Checks

| Check | Expect |
|-------|--------|
| `GET /health` | ok or degraded with clear storage check |
| `POST /skills/execute` `sales.estimate.read` | ok rows or clear failure |
| Unknown intent_code | 400 / validation_error; no ERP call |
| Evidence under `STORAGE_ROOT/evidence/` | file present when write succeeds |
| Browser network | no direct calls to orchestrator/Odoo |

## Reports

Placeholder: [Reports/TR-OPS-008-01.md](./Reports/TR-OPS-008-01.md)
