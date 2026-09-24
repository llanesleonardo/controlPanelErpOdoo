# TP-OPS-002 — Preview a risky write before changing ERP data

**Scenario:** [OPS-002](../../Subsystem/SAC-007/Scenarios/OPS-002.md)  
**SHALLs:** SRD-TSK-004 … SRD-TSK-007 · SRD-LOG-001 … SRD-LOG-004 · parent SRD-SEC-003 · SRD-SEC-004 · SRD-OPS-002  
**Status:** Not run

## Method

1. Follow OPS-002 on a local or Compose stack.  
2. Prefer `ERP_MODE=simulate` / `ODOO_MODE=simulate` unless deliberately testing live reads.  
3. Record pass/fail and correlation ids in Reports/.

## Setup

- Postgres up; gateway + orchestrator running  
- `.env` from `.env.example` with `STORAGE_ROOT=./resources/storage/local` and `LOG_DIR=./resources/logs`  
- Web at http://localhost:3000 · gateway http://localhost:3001  

## Checks

| Check | Expect |
|-------|--------|
| Create dry-run task for allowlisted write intent | Task completes (or fails clearly); ERP business data unchanged |
| Task detail | Predicted effects / warnings (or structured evidence) visible |
| Logs search by correlation_id | Matching structured lines |
| Evidence path (if written) | Under `resources/storage/local/evidence/{correlation_id}/` |
| Unknown intent | Validation error; no invented ERP call |

## Reports

Placeholder: [Reports/TR-OPS-002-01.md](./Reports/TR-OPS-002-01.md)
