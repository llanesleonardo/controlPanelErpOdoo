# TP-OPS-011 - Find / dismiss estimate issues

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-011 |
| **Scenario** | [OPS-011](../../Subsystem/SAC-008/Scenarios/OPS-011.md) (**Open**) |
| **Subsystem** | SAC-008 |
| **Related SRD** | SRD-ISS-001…007, parent SRD-EST-003 |
| **Method** | Test / Demo |
| **Status** | **Open** (runtime often **blocked** on GAP-02) |

## Purpose

Prove find/persist/dismiss on the **ERP SoA peer** wedge without freestyle peer writes.

## Setup

| Item | Value |
|------|--------|
| When implemented | Postgres + gateway + orch + web |
| Mode | Prefer simulate first |
| Risk | [GAP-02](../../Subsystem/Risks.md) may block runtime |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Find (simulate) | Deterministic issues; no Odoo required |
| TC-002 | Find (live) | Connector diagnose; clear fail if down |
| TC-003 | List | Open / dismissed in Estimates UI |
| TC-004 | Dismiss | Control-plane only; ERP rows unchanged |
| TC-005 | UI language | No raw Odoo model names |
| TC-006 | Correlation | Find run in Logs when wired |

Record **Blocked** in the TR if GAP-02 still applies.


## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-011-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
