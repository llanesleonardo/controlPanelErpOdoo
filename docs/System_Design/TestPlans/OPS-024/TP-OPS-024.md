# TP-OPS-024 — SaaS multi-tenant (Offer A)

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-024 |
| **Scenario** | [OPS-024](../../Subsystem/SAC-009/Scenarios/OPS-024.md) |
| **SRD** | SRD-TEN-002, SRD-TEN-004, SRD-DEP-011 |
| **Status** | **Open** (no TR yet) |
| **Revision** | 0.1 |

## Objective

Prove a **SaaS multi-tenant** deployment enables multi-tenant features for that SKU and (when built) isolates tenant data.

## Scope

- Mode `multi_tenant`  
- Tenant context on requests  
- Isolation / admin (when GAP-13 closed)

## Out of scope

- Dedicated Offer B behavior (OPS-023)  
- Implementing partitioning in this plan revision

## Cases (planned)

| ID | Case | Method | Pass |
|----|------|--------|------|
| C1 | `DEPLOYMENT_MODE=multi_tenant` on config API | Test | mode + tenant_header documented |
| C2 | Tenant A cannot read tenant B control-plane rows | Test | when partitioning ships |
| C3 | Offer A SKU includes multi-tenant feature family | Inspection | packaging + price list |

## Evidence

TR under `TestPlans/OPS-024/Reports/` when executed. Close only with SRVM.

## History

| Date | Rev | Note |
|------|-----|------|
| 2026-09-25 | 0.1 | V-Model packaging — plan only |
