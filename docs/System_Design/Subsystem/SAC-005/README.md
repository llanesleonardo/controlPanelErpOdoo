# SAC-005 - Connector catalog - SoA / data / logic peers

How the control plane reaches **peer edges** from the ontology hub. **Systems of action**, **data sources**, and **logic sources** share one first-party connector catalog. **ERP (Odoo today) is SoA peer #1** (`connector_id=odoo`) — configure URL and credentials, test health, then allowlisted skills read (and later write) through an anti-corruption layer. Never free-form RPC from the browser.

ERP is **not** the sole system of record for every property: ownership is per binding. Control-plane Postgres is separate. Peers are **not** hosted in our Docker Compose ([SAC-009](../SAC-009/README.md)). The same catalog pattern rebinds when replicating the product for another company.

## What you get

| Piece | Job |
|-------|-----|
| Integrations / Odoo | Save connection settings; **Test** health (`ok` / `degraded` / `down`) |
| `ODOO_MODE=live\|simulate` | Live JSON-RPC to Odoo, or safe sample rows when the ERP peer is unreachable |
| Skill `sales.estimate.read` | First production **read** — job estimates into Sales / Explorer |
| Adapters under orchestrator | Map domain ports to vendor models; keep vendor field names inside the connector |
| Connector SPI | Product-owned catalog: Odoo is SoA peer #1; shops configure, they do not upload adapters |
| Multi-peer | Additional SoA / data / logic connectors use the same health + capability pattern |

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true for connectors (ODOO + PEER) |
| [TSD.md](./TSD.md) | Adapters, `ODOO_*` env, binding YAML, call path |
| [TRACE.md](./TRACE.md) | Requirement to scenario to test |
| [Scenarios/OPS-001.md](./Scenarios/OPS-001.md) | Read estimates via ERP SoA peer |
| [Scenarios/OPS-014.md](./Scenarios/OPS-014.md) | Enable / health-check a non-ERP SoA connector |
| [Scenarios/OPS-015.md](./Scenarios/OPS-015.md) | Bind a data-source edge into ontology |

**Shop how-to:** [Connect ERP](../../../User_Guide/Connect_ERP/README.md)  
**Related:** [SAC-004](../SAC-004/README.md) skills engine · [SAC-006](../SAC-006/README.md) business map · [Component_Map](../../TSD/Component_Map.md) · [parent TSD](../../TSD/ControlPanelOntology_TSD.md)
