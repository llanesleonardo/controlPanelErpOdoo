# SAC-005 — Software Requirements (SRD)

Plain rules for the **first-party connector catalog** that reaches peer edges from the ontology hub. **Systems of action**, **data sources**, and **logic sources** are peers. **ERP** (Odoo today) is **SoA peer #1** (`connector_id=odoo`) — not the sole system of record for every property, and not the product brain.

Local IDs keep **SRD-ODOO-*** for the Odoo wedge and add **SRD-PEER-*** for multi-edge catalog rules. They align with parent [SRD-CONN](../../SRD/ControlPanelOntology_SRD.md), [SRD-EST](../../SRD/ControlPanelOntology_SRD.md), and [SRD-EDGE](../../SRD/ControlPanelOntology_SRD.md).

## Scope

- First-party connector catalog (SoA / data / logic peers); customers configure, they do not upload adapters
- Configure and health-check connector `odoo` (SoA peer #1)
- Live and simulate modes for the ERP peer (pattern reusable by later peers)
- First live read skill: `sales.estimate.read` via the ERP SoA connector
- Anti-corruption: vendor models/fields stay inside adapters
- Per-binding / per-property ownership so ERP is not assumed to own every field

## Out of scope

- Hosting any peer (including Odoo) inside Compose
- Embedding peer UIs in the control panel
- Customer-uploaded connector SDK or free-form RPC from chat
- Live writes / quote creation (other SACs / later allowlist entries)
- Multi-company advanced mapping UI
- Full CDC / digital twin of every peer row ([Risks](../Risks.md) GAP-01)

## Requirements

### Odoo SoA peer #1 (wedge)

#### SRD-ODOO-001 — Health and status

The system SHALL let an operator configure Odoo connection metadata and run a **Test connection** that reports status `ok`, `degraded`, or `down` with a short error class/message (never a raw password).

*Aligns:* parent **SRD-CONN-001**

#### SRD-ODOO-002 — Live and simulate modes

The system SHALL support `ODOO_MODE=live` (real JSON-RPC) and `ODOO_MODE=simulate` (deterministic sample rows / synthetic health) so the panel can be used when the ERP peer is down or not yet wired. Prefer documenting `ERP_MODE` as the shared name when other SoA peers share the pattern.

*Aligns:* parent **SRD-CONN-001**

#### SRD-ODOO-003 — Live estimate read

When configured for live mode with valid credentials, the system SHALL read estimate rows via the ERP SoA connector and allowlisted skill `sales.estimate.read`, returning shop-facing columns (not raw Odoo RPC payloads).

*Aligns:* parent **SRD-EST-001**

#### SRD-ODOO-004 — Optional contains filter

`sales.estimate.read` SHALL accept an optional `contains` (or equivalent search) string and filter estimates where part number **or** description contains that value (case-insensitive). Empty filter SHALL return the default active set.

#### SRD-ODOO-005 — Anti-corruption layer

Domain DTOs, taxonomy skill codes, and UI tables SHALL NOT expose raw Odoo model names or RPC shapes. Vendor field maps live in connector adapters / binding YAML for adapter use only.

*Aligns:* parent **SRD-SEC-005**

#### SRD-ODOO-006 — Catalog identity for Odoo

Odoo SHALL be identified as `connector_id=odoo` in the first-party catalog and treated as **SoA peer #1** (first production SoA wedge), not as the ontology hub.

*Aligns:* parent **SRD-CONN-001**

#### SRD-ODOO-007 — Capability gate

Each connector (including `odoo`) SHALL declare which skill codes it supports. The UI / allowlist SHALL NOT offer a skill as executable without a capable enabled connector (or an explicit simulate path for that skill).

*Aligns:* parent **SRD-CONN-004**

#### SRD-ODOO-008 — Secrets stay out of logs and GET echoes

Credentials and API keys SHALL NOT be logged in plaintext. GET of connector config SHALL mask secrets (e.g. `configured: true` / `••••`), not return the full secret.

#### SRD-ODOO-009 — External peer edge

Odoo SHALL remain outside the control-plane Compose stack and be reached only via connector URLs / adapters. Control-plane Postgres stores connector config and evidence — not a twin of the ERP database, and not a substitute peer store for other edges.

*Aligns:* parent **SRD-CONN-001**; deploy rules in [SAC-009](../SAC-009/SRD.md)

### Multi-peer catalog

#### SRD-PEER-001 — First-party multi-edge catalog

Connectors SHALL be a curated product catalog spanning **systems of action**, **data sources**, and **logic sources**. Customers SHALL configure enabled peers; they SHALL NOT define connector payloads, module maps, or custom adapters.

*Aligns:* parent **SRD-CONN-002**

#### SRD-PEER-002 — Additional SoA peers

Additional systems of action beyond ERP SHALL appear only as product-owned first-party connectors using the same health / capability / ACL pattern as `odoo`.

*Aligns:* parent **SRD-EDGE-002**, **SRD-CONN-002** · *Scenario:* [OPS-014](./Scenarios/OPS-014.md)

#### SRD-PEER-003 — Data-source peers

Product-owned data-source connectors SHALL bind into ontology properties without exposing raw source payloads in public catalog APIs.

*Aligns:* parent **SRD-EDGE-003** · *Scenario:* [OPS-015](./Scenarios/OPS-015.md)

#### SRD-PEER-004 — Logic-source peers

Logic-source execution SHALL occur only as ontology action → allowlisted skill → logic connector — never as free-form code from chat.

*Aligns:* parent **SRD-EDGE-004** · *Detail also:* [SAC-004](../SAC-004/SRD.md)

#### SRD-PEER-005 — Per-property / per-binding ownership

The system SHALL support per-property (or per-binding) ownership so the ERP SoA peer is **not** assumed to own every field on every ontology type. Ownership metadata SHALL be inspectable (Schema / binding inspector as product surfaces land).

*Aligns:* parent **SRD-CONN-003** · *Scenario:* [OPS-022](../SAC-006/Scenarios/OPS-022.md)

## Trace

| ID | Scenario | Test plan |
|----|----------|-----------|
| SRD-ODOO-001 … 009 (and parent SRD-CONN / SRD-EST) | [OPS-001](./Scenarios/OPS-001.md) | [TP-OPS-001](../../TestPlans/OPS-001/TP-OPS-001.md) |
| SRD-PEER-002 | [OPS-014](./Scenarios/OPS-014.md) | [TP-OPS-014](../../TestPlans/OPS-014/TP-OPS-014.md) |
| SRD-PEER-003 | [OPS-015](./Scenarios/OPS-015.md) | [TP-OPS-015](../../TestPlans/OPS-015/TP-OPS-015.md) |
| SRD-PEER-004 | [OPS-016](../SAC-004/Scenarios/OPS-016.md) | [TP-OPS-016](../../TestPlans/OPS-016/TP-OPS-016.md) |
| SRD-PEER-005 | [OPS-022](../SAC-006/Scenarios/OPS-022.md) | [TP-OPS-022](../../TestPlans/OPS-022/TP-OPS-022.md) |
| SRD-PEER-001, 007 capability | Parent SRD-CONN-002 / 004 | OPS-001 / OPS-014 |
