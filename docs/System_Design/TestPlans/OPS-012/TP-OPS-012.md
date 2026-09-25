# TP-OPS-012 - Allowlist / rate-limit reject

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-012 |
| **Scenario** | [OPS-012](../../Subsystem/SAC-001/Scenarios/OPS-012.md) (**Open**) |
| **Subsystem** | SAC-001 |
| **Related SRD** | SRD-GW-001…010, parent SRD-SEC-001, 002, 004 |
| **Method** | Test |
| **Status** | **Open** |

## Purpose

Prove gateway fails closed on unknown skills and rate-limit abuse; allowlisted edge skills may proceed.

## Setup

| Item | Value |
|------|--------|
| Gateway | Host or Compose profile `apps` |
| Rate limit | Optionally lower `RATE_LIMIT_MAX` to trip 429 |
| Edge | Prefer simulate |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Allowlisted path | Proceeds or clear peer/simulate error - not invented tool |
| TC-002 | Unknown skill | 4xx / reject or documented demo fallback |
| TC-003 | Burst over limit | HTTP 429, clear message |
| TC-004 | Correlation header | `X-Correlation-Id` present |
| TC-005 | Actor header | `X-Actor-Id` used for bucket / logs |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-012-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
