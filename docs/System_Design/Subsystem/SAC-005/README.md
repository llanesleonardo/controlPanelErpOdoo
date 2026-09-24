# SAC-005 — Odoo connector (ERP #1)

How the control panel talks to the shop’s **ERP** (enterprise resource planning system). Today that ERP is **Odoo**. We ship one **first-party connector** (`connector_id=odoo`): you configure URL and credentials, we test health, then allowlisted skills can read (and later write) through an anti-corruption layer — never free-form RPC from the browser.

Your ERP stays the system of record. Our control-plane database is separate. Odoo is **not** hosted in our Docker Compose ([SAC-009](../SAC-009/README.md)).

## What you get

| Piece | Job |
|-------|-----|
| Integrations ? Odoo | Save connection settings; **Test** health (`ok` / `degraded` / `down`) |
| `ODOO_MODE=live\|simulate` | Live JSON-RPC to Odoo, or safe sample rows when the ERP is unreachable |
| Skill `sales.estimate.read` | First production **read** — job estimates into Sales / Explorer |
| Adapters under orchestrator | Map domain ports ? Odoo models; keep vendor field names inside the connector |
| Connector SPI | Product-owned catalog: Odoo is connector #1; shops do not upload custom adapters |

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true for the Odoo connector |
| [TSD.md](./TSD.md) | Adapters, `ODOO_*` env, binding YAML, call path |
| [TRACE.md](./TRACE.md) | Requirement ? scenario ? test |
| [Scenarios/OPS-001.md](./Scenarios/OPS-001.md) | Read live (or simulate) job estimates |

**Shop how-to:** [Connect ERP](../../../User_Guide/Connect_ERP/README.md)  
**Related:** [SAC-004](../SAC-004/README.md) skills engine · [SAC-006](../SAC-006/README.md) business map · [parent TSD](../../TSD/ControlPanelERP_TSD.md)

## Legacy harvest

Rewritten from `_legacy/` (do not edit legacy packs):

- Epic-01 / phase-04 / task-01 — Odoo Integration page
- Epic-04 / phase-01 / task-02 — Odoo integration (health, live/simulate)
- Epic-05 / phase-01 / task-03 — Live estimate read (`sales.estimate.read`)
- Epic-06 / phase-01 / task-01 — Connector SPI and catalog
