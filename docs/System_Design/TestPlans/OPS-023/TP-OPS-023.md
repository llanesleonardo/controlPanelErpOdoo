# TP-OPS-023 — Dedicated single-tenant (Offer B)

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-023 |
| **Scenario** | [OPS-023](../../Subsystem/SAC-009/Scenarios/OPS-023.md) |
| **SRD** | SRD-TEN-001, SRD-TEN-003, SRD-DEP-010, SRD-DEP-012 |
| **Status** | **Open** (no TR yet) |
| **Revision** | 0.1 |

## Objective

Prove a **dedicated** deployment runs Ontology + AI for one customer and **does not** expose multi-tenant SaaS features for that SKU.

## Scope

- Config / mode verification  
- Entitlement absence (when gates exist)  
- Pricing/SKU documentation check (inspection)

## Out of scope

- Full SaaS isolation (OPS-024)  
- Implementing entitlement code in this plan revision

## Cases (planned)

| ID | Case | Method | Pass |
|----|------|--------|------|
| C1 | `DEPLOYMENT_MODE=single_tenant` visible on `GET /config/deployment` | Test | mode + tenant_id match env |
| C2 | Multi-tenant admin / tenant picker not available | Inspection / Test | no UI route or 403/404 |
| C3 | Offer B SKU docs state multi-tenant features excluded | Inspection | packaging guide + price list |

## Evidence

Store TR under `TestPlans/OPS-023/Reports/` when executed. Close OPS-023 in SRVM only with TR.

## History

| Date | Rev | Note |
|------|-----|------|
| 2026-09-25 | 0.1 | V-Model packaging — plan only |
