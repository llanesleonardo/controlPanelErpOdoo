# SAC-004 — Orchestrator — skills engine

The **skills engine** runs certified actions against your **ERP (Odoo #1)** through connectors: validate the intent, call the right adapter, save evidence. The browser never talks to the orchestrator or Odoo directly — only the NestJS gateway does. Risky writes get a **dry-run (preview)** before any commit.

## What you get

| Piece | Job |
|-------|-----|
| FastAPI app (`apps/orchestrator`) | Internal skills API — dry-run + execute |
| Skill facade | Allowlist only — no invented ERP calls |
| Adapters / ports | ERP quirks stay behind connector ports |
| Evidence files | Predicted effects / results under `STORAGE_ROOT/evidence/` |
| Resilience | Retry + circuit toward the ERP connector |

Orchestrator is **not** a public internet endpoint (see [SAC-009](../SAC-009/README.md)).

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true for the skills engine |
| [TSD.md](./TSD.md) | FastAPI layout, allowlists, ERP_MODE / ODOO_MODE |
| [TRACE.md](./TRACE.md) | Requirement ? scenario ? test |
| [Scenarios/OPS-008.md](./Scenarios/OPS-008.md) | Run an allowlisted skill (execute) |
| Dry-run shop story (owned with tasks) | [OPS-002](../SAC-007/Scenarios/OPS-002.md) |

Runtime: [`apps/orchestrator`](../../../../apps/orchestrator/). Intent codes: [SAC-003](../SAC-003/README.md). ERP adapter detail: [SAC-005](../SAC-005/README.md).

**Shop how-to:** [User Guide](../../../User_Guide/README.md) (console / tasks). Engineering stays here.  
**Legacy:** Epic-01/04 dry-run · Epic-04 dry-run path · Epic-05 execute · Epic-06 connector SPI under [`_legacy/`](../../_legacy/).
