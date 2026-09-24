# TP-OPS-009 — Pick an intent from ERP Map and open console

**Scenario:** OPS-009  
**SHALLs:** SRD-SCR-001 … SRD-SCR-005, SRD-SCR-011 (parent SRD-UI-001, SRD-UI-002)  
**Status:** Not run

## Method

1. Follow [OPS-009](../../Subsystem/SAC-002/Scenarios/OPS-009.md).  
2. Web + gateway running (npm or Compose profile `apps`).  
3. Record pass/fail in Reports/.

## Setup

- `npm run dev:web` and gateway reachable per `.env`  
- Dev actor stub acceptable (`X-Actor-Id`)

## Checks

| Check | Expect |
|-------|--------|
| `/` module tile | Navigates to `/sections/<slug>` |
| Intents rail | Section-scoped list; search filters |
| Intent detail | Profile / call path visible; no Odoo credential fields |
| Console deep link | `/console?intent_code=…` (and domain) |
| Classify (optional) | Gateway responds with taxonomy `intent_code` |
| Theme toggle (smoke) | Light/dark switches and survives refresh |

## Reports

Placeholder: add `Reports/TR-OPS-009-01.md` when first run is recorded.
