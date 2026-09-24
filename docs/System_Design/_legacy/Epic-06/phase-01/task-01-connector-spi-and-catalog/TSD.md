# Connector SPI & catalog — Technical Specification Document (TSD)

**Status:** not started  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

Product-owned connector SPI framing and registry alignment for Epic-06.

## Patterns applied

- [Anti-Corruption Layer](../../../../../Software%20Patterns%20Docs/Distributed_system_patterns/15-anti-corruption-layer.md)
- [Adapter](../../../../../Software%20Patterns%20Docs/Structural%20Patterns/Adapter.md)
- [Hexagonal Architecture](../../../../../Software%20Patterns%20Docs/Architectural%20Patterns/05-hexagonal-architecture.md)
- [Health Checks](../../../../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/09-health-checks.md)

## Stack / docs

| Piece | Choice |
|-------|--------|
| Product SPI | `docs/System_Design/Subsystem/SAC-005/README.md` |
| Components | `docs/System_Design/Subsystem/SAC-005/` |
| Odoo connector docs | `docs/User_Guide/Connect_ERP/` |
| Architecture | `docs/System_Design/ConOps/ControlPanelERP_ConOps.md` |
| Runtime (when coded) | Orchestrator registry: `connector_id` → adapters + capability set |

## Implementation notes

- Prefer a small in-code registry (dict/module) over a plugin loader.
- Reuse existing `/integrations/odoo` as the Odoo connector config UI; do not invent a multi-connector UI until connector #2 ships.
- Schema package `packages/odoo_schema` stays Odoo-specific; name future packages per connector.
