# TP-OPS-003 — Approve or reject a queued task

**Scenario:** [OPS-003](../../Subsystem/SAC-007/Scenarios/OPS-003.md)  
**SHALLs:** SRD-TSK-001 … SRD-TSK-003 · parent SRD-OPS-001  
**Status:** Not run

## Method

1. Follow OPS-003 on a local or Compose stack.  
2. Start from a task in `needs_approval`.  
3. Record pass/fail and actor / correlation ids in Reports/.

## Setup

- Postgres up; gateway running (orchestrator optional for approve/reject alone)  
- Web at http://localhost:3000 · gateway http://localhost:3001  
- Dev actor via `X-Actor-Id` or UI default is acceptable  

## Checks

| Check | Expect |
|-------|--------|
| List / filter tasks | `needs_approval` task visible |
| Task detail | Intent, state, payloads / evidence visible |
| Approve | State → completed (or documented post-approve state); actor + timestamp set; no live ERP commit in current product |
| Reject | State → rejected; ERP untouched |
| Approve/reject when not `needs_approval` | Refused with clear error |

## Reports

Placeholder: [Reports/TR-OPS-003-01.md](./Reports/TR-OPS-003-01.md)
