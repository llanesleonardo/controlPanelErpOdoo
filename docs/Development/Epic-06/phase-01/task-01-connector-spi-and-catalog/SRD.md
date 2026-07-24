# Connector SPI & catalog — Software Requirements Document (SRD)

**Status:** not started  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose

Make the **first-party connector catalog** an explicit product requirement: the control plane connects through connectors **we** ship one by one; customers configure them; Odoo is connector `odoo`, not the product identity.

## Scope

- Documented SPI + capability matrix (see [connectors.md](../../../connectors.md))
- Code/docs alignment: connector id `odoo` for existing integration
- Optional: thin registry module in orchestrator/gateway that lists connectors + capabilities (no second production SoR)

## Out of Scope

- Second production connector
- Customer-built adapter SDK
- Estimate issues find/UI (tasks 02–03)

## Requirements

### SRD-E06-T01-01

**First-party only** — The product shall treat connectors as a curated catalog owned by the platform; customers shall not define connector payloads or module maps.

### SRD-E06-T01-02

**Odoo as connector #1** — Existing Odoo integration shall be identified as `connector_id=odoo` in docs and any new registry surface.

### SRD-E06-T01-03

**Capability declaration** — Each connector shall declare which skill codes it supports; allowlist/UI shall not offer skills without a capable enabled connector.

### SRD-E06-T01-04

**ACL** — Vendor auth, transport, payloads, and modules shall remain inside the connector adapters.
