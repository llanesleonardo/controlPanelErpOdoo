# TP-OPS-011 — Find and dismiss estimate issues

**Scenario:** [OPS-011](../../Subsystem/SAC-008/Scenarios/OPS-011.md)  
**SHALLs:** SRD-ISS-001 … SRD-ISS-008  
**Status:** Not run (blocked on [GAP-02](../../Subsystem/Risks.md) until runtime exists)

## Method

1. When find/persist/dismiss is implemented, follow OPS-011 on a local or Compose stack.  
2. Prefer simulate mode for first pass; optional live connector for diagnose.  
3. Record pass/fail / blocked and correlation ids in Reports/.

## Setup

- Postgres up; gateway + orchestrator when exercising find  
- Web at http://localhost:3000  
- Estimates section available (Epic-05 shell)

## Checks

| Check | Expect |
|-------|--------|
| Find issues (simulate) | Deterministic issues persisted; no Odoo call required |
| Find issues (live) | Issues from connector diagnose; clear failure if connector down |
| List | Open (and optional dismissed) visible in Estimates UI |
| Dismiss | Control-plane status only; ERP estimate unchanged |
| UI language | No raw Odoo model names in operator copy |
| Correlation | Find run id searchable in Logs when logging is wired |

## Reports

Placeholder: add `Reports/TR-OPS-011-01.md` on first execution.
