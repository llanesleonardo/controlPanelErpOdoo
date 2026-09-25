# TP-E-01 - Docs / ConOps still match how the shop runs

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-E-01 |
| **Scenario** | [E-01](../../Subsystem/Scenarios/E-01.md) (**Open**) |
| **Subsystem** | Cross-cutting |
| **Related SRD** | Pack alignment (ConOps / SRD / SAC READMEs) |
| **Method** | Inspection |
| **Status** | **Open** |

## Purpose

Prove System_Design pack still describes the **ontology hub + multi-SoA** shop story (ERP = peer #1).

## Setup

| Item | Value |
|------|--------|
| Docs | ConOps, parent SRD, Subsystem README, Risks |
| Apps | Spot-check UI labels vs ConOps (Map, /ontology, Integrations) |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | ConOps hub story | Ontology hub; ERP not sole brain/SoR for every property |
| TC-002 | SAC SRDs | No ERP-as-SoR contradictions in SAC-001/004/005 intros |
| TC-003 | Scenarios Open policy | SCENARIOS + SRVM say Open until TR |
| TC-004 | Redirects | `docs/GAPS` and `docs/Development` point at Risks / System_Design |
| TC-005 | Drift | List mismatches; leave E-01 Open until fixed + TR |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-E-01-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
