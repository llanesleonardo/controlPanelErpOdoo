# SAC-004 - Orchestrator - skills engine

The **skills engine** runs certified actions against the **owning peer edge** (system of action, data, or logic) through first-party connectors: validate the intent, call the right adapter, save evidence. **ERP (Odoo) is SoA peer #1** for the estimate wedge — not the only target. The browser never talks to the orchestrator or vendors directly — only the NestJS gateway does. Risky writes get a **dry-run (preview)** before any commit.

For a carbide-tool shop, skills cover the same spine as the Map: estimates, inventory, make, quality, ship — always allowlisted.

## What you get

| Piece | Job |
|-------|-----|
| FastAPI app (`apps/orchestrator`) | Internal skills API — dry-run + execute |
| Skill facade | Allowlist only — no invented peer calls |
| Adapters / ports | Vendor quirks stay behind connector ports |
| Action resolution | Ontology action → skill → `connector_id` (not hard-coded Odoo) |
| Evidence files | Predicted effects / results under `STORAGE_ROOT/evidence/` |
| Resilience | Retry + circuit toward connectors |

Orchestrator is **not** a public internet endpoint (see [SAC-009](../SAC-009/README.md)).

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true for the skills engine |
| [TSD.md](./TSD.md) | FastAPI layout, allowlists, ERP_MODE / ODOO_MODE |
| [TRACE.md](./TRACE.md) | Requirement to scenario to test |
| [Scenarios/OPS-008.md](./Scenarios/OPS-008.md) | Run an allowlisted skill (execute) |
| [Scenarios/OPS-013.md](./Scenarios/OPS-013.md) | Act on ontology object targeting any SoA |
| [Scenarios/OPS-016.md](./Scenarios/OPS-016.md) | Invoke a logic-source edge as ontology action |
| Dry-run shop story (owned with tasks) | [OPS-002](../SAC-007/Scenarios/OPS-002.md) |

Runtime: [`apps/orchestrator`](../../../../apps/orchestrator/). Intent codes: [SAC-003](../SAC-003/README.md). Connectors: [SAC-005](../SAC-005/README.md).

**Shop how-to:** [User Guide](../../../User_Guide/README.md) (console / tasks). Engineering stays here.
