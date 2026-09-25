# SAC-008 - Estimate issues wedge

Find messy **estimate data problems**, park them in the control plane, and **dismiss** false alarms - without free-form ERP edits.

This is a **governed diagnose path** on the Odoo connector: read/diagnose ? persist issue rows ? list and dismiss in the Estimates section. Runtime is still open (see [Risks GAP-02](../Risks.md)); these docs lock the shop story and the build shape.

## What you get

| Piece | Job |
|-------|-----|
| Find issues | Trigger a skill via gateway ? orchestrator ? estimate adapter |
| Persist | Store issue rows in control-plane Postgres (stable ids, status) |
| List / dismiss | Estimates UI - dismiss is control-plane only (ERP untouched) |
| Modes | `simulate` = deterministic dummy issues; `live` = connector read/diagnose |
| Language | Product / taxonomy words - not raw Odoo model names in the UI |

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true for find / persist / dismiss |
| [TSD.md](./TSD.md) | How gateway, orchestrator, DB, and UI fit |
| [TRACE.md](./TRACE.md) | Requirement ? scenario ? test |
| [Scenarios/OPS-011.md](./Scenarios/OPS-011.md) | Find and dismiss estimate issues |

Live estimate **read** (happy path) lives under [SAC-005](../SAC-005/) / [OPS-001](../SAC-005/Scenarios/OPS-001.md). This SAC is the **issues** wedge on top.

