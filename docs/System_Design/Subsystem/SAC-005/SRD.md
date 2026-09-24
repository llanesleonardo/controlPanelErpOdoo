# SAC-005 — Software Requirements (SRD)

Plain rules for connecting the carbide-tool shop’s **ERP** (Odoo) through a product-owned connector. Local IDs use **SRD-ODOO-***; they align with parent [SRD-CONN](../../SRD/ControlPanelERP_SRD.md) and [SRD-EST](../../SRD/ControlPanelERP_SRD.md).

## Scope

- Configure and health-check connector `odoo`
- Live and simulate modes
- First live read skill: `sales.estimate.read`
- Anti-corruption: vendor models/fields stay inside adapters
- First-party connector SPI (no customer-built adapters)

## Out of scope

- Hosting Odoo inside Compose
- Embedding the Odoo UI in the control panel
- Customer-uploaded connector SDK or free-form RPC from chat
- Live writes / quote creation (other SACs / later allowlist entries)
- Multi-company advanced mapping UI

## Requirements

### SRD-ODOO-001 — Health and status

The system SHALL let an operator configure Odoo connection metadata and run a **Test connection** that reports status `ok`, `degraded`, or `down` with a short error class/message (never a raw password).

*Aligns:* parent **SRD-CONN-001**

### SRD-ODOO-002 — Live and simulate modes

The system SHALL support `ODOO_MODE=live` (real JSON-RPC) and `ODOO_MODE=simulate` (deterministic sample rows / synthetic health) so the panel can be used when the ERP is down or not yet wired.

*Aligns:* parent **SRD-CONN-001**

### SRD-ODOO-003 — Live estimate read

When configured for live mode with valid credentials, the system SHALL read estimate rows from the ERP via allowlisted skill `sales.estimate.read` and return shop-facing columns (not raw Odoo RPC payloads).

*Aligns:* parent **SRD-EST-001**

### SRD-ODOO-004 — Optional contains filter

`sales.estimate.read` SHALL accept an optional `contains` (or equivalent search) string and filter estimates where part number **or** description contains that value (case-insensitive). Empty filter SHALL return the default active set.

### SRD-ODOO-005 — Anti-corruption layer

Domain DTOs, taxonomy skill codes, and UI tables SHALL NOT expose raw Odoo model names or RPC shapes. Vendor field maps live in connector adapters / binding YAML for adapter use only.

*Aligns:* parent **SRD-SEC-005**

### SRD-ODOO-006 — First-party connector catalog

Connectors SHALL be a curated product catalog. Odoo SHALL be identified as `connector_id=odoo`. Customers SHALL NOT define connector payloads, module maps, or custom adapters.

*Aligns:* parent **SRD-CONN-002**

### SRD-ODOO-007 — Capability gate

Each connector SHALL declare which skill codes it supports. The UI / allowlist SHALL NOT offer a skill as executable without a capable enabled connector (or an explicit simulate path for that skill).

### SRD-ODOO-008 — Secrets stay out of logs and GET echoes

Credentials and API keys SHALL NOT be logged in plaintext. GET of connector config SHALL mask secrets (e.g. `configured: true` / `••••`), not return the full secret.

### SRD-ODOO-009 — External system of record

Odoo SHALL remain outside the control-plane Compose stack. Control-plane Postgres stores connector config and evidence — not a twin of the ERP database.

*Aligns:* parent **SRD-CONN-001**; deploy rules in [SAC-009](../SAC-009/SRD.md)

## Trace

| ID | Scenario | Test plan |
|----|----------|-----------|
| SRD-ODOO-001 … 009 (and parent SRD-CONN / SRD-EST) | [OPS-001](./Scenarios/OPS-001.md) | [TP-OPS-001](../../TestPlans/OPS-001/TP-OPS-001.md) |
