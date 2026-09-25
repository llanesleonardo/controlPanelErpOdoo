# TP-OPS-019 - App / SDK / API via ontology

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-019 |
| **Scenario** | [OPS-019](../../Subsystem/SAC-001/Scenarios/OPS-019.md) (**Open**) |
| **Subsystem** | SAC-001 |
| **Related SRD** | SRD-GW-001, parent SRD-EDGE-006 |
| **Method** | Test |
| **Status** | **Open** |

## Purpose

Prove external apps/SDKs call control-plane **gateway** APIs - not raw vendor RPC with shop credentials.

## Setup

| Item | Value |
|------|--------|
| Client | curl / SDK stub with `X-Actor-Id` + `X-Correlation-Id` |
| Target | Gateway ontology / skills / tasks routes only |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Gateway call | Catalog or skill execute succeeds or fails clearly |
| TC-002 | No vendor RPC | Client has no Odoo URL/credentials requirement |
| TC-003 | Headers | Correlation / actor propagated |
| TC-004 | Allowlist | Unknown skill rejected at gateway |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-019-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
