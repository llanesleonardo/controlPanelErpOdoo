# SAC-003 — Software Requirements (SRD)

Plain vocabulary rules for the carbide-shop control panel. The **ontology hub** uses this taxonomy for intents and skills across peer edges. **ERP** (Odoo today) is **SoA peer #1** — every executable shop action must map to a known intent code, not free-form RPC against any peer.

## Scope

- Controlled taxonomy: domains, entities, verbs, result states, error classes, approval levels
- Intent code shape `{domain}.{entity}.{verb}` and a published known-code list
- Sample OpenAPI-style YAML contracts (Sales, Inventory, Accounting + common schemas)
- Authoring under `Authoring/`; importable package under `resources/packages/contracts`
- Sync from Authoring ContractsDocs into the package

## Out of scope

- Runtime natural-language / ML classifier that invents new codes
- Full peer field-level mapping (belongs in connectors — SAC-005)
- NestJS / FastAPI schema-validation middleware as this SAC’s deliverable
- Expanding beyond published sample contracts without updating Authoring first
- Hosting or replacing any peer edge (including ERP)

## Requirements

### Taxonomy

#### SRD-TAX-001 — Published vocabulary

The product SHALL maintain a documented taxonomy covering domains, entities, verbs, result states, and error classes. Canonical authoring SHALL live under [Authoring/TaxonomyDocs](./Authoring/TaxonomyDocs/).

#### SRD-TAX-002 — Intent code shape

Every executable operation SHALL be nameable as `{domain}.{entity}.{verb}` (e.g. `sales.order.create`, `inventory.stock.adjust`).

#### SRD-TAX-003 — Domains

The taxonomy SHALL include at least: `sales`, `inventory`, `purchasing`, `accounting`, `customers`, `vendors`, `products`, `jobs`, `incidents`, `logs`.

#### SRD-TAX-004 — Verbs

The taxonomy SHALL include at least: `create`, `read`, `update`, `cancel`, `approve`, `reconcile`, `allocate`, `reserve`, `close`, `adjust`, `post`.

#### SRD-TAX-005 — Result states and error classes

The taxonomy SHALL define result states (`accepted`, `rejected`, `needs_approval`, `executed`, `failed`, `rolled_back`, `verified`) and error classes (`validation_error`, `policy_violation`, `dependency_failure`, `odoo_rejection`, `timeout`, `data_conflict`).

#### SRD-TAX-006 — Approval levels

Vocabulary docs SHALL define approval levels: `none`, `operator`, `manager`, `admin`.

#### SRD-TAX-007 — Known intent codes

The contracts package SHALL export a known intent-code list that includes at least the sample write/read operations from Authoring (`sales.order.create`, `inventory.stock.adjust`, `accounting.invoice.post`) and SHALL provide a helper to test membership (e.g. `isKnownIntentCode`).

#### SRD-TAX-008 — Docs parity for taxonomy

Exported taxonomy constants in `resources/packages/contracts` SHALL match Authoring TaxonomyDocs. Vocabulary meaning changes SHALL update Authoring first, then package exports.

### Contracts

#### SRD-CTR-001 — Sample catalog

The product SHALL publish OpenAPI-style YAML samples for at least one Sales, Inventory, and Accounting write operation plus shared common schemas under [Authoring/ContractsDocs](./Authoring/ContractsDocs/).

#### SRD-CTR-002 — Shared policy fields

Each sample contract SHALL document (or reference) idempotency, timeout, retry, approval policy, expected output, verification, and rollback guidance.

#### SRD-CTR-003 — Execution mode

Write contracts SHALL support `execution_mode` of `dry_run` and `commit` so operators can preview before changing peer-edge data (including ERP SoA peer #1).

#### SRD-CTR-004 — Observability

Contracts SHALL include or reference `correlation_id` and `actor_id` via the common Observability schema.

#### SRD-CTR-005 — Package assets

`resources/packages/contracts` SHALL include the sample YAML (common + sales + inventory + accounting) loadable by short name or known intent code.

#### SRD-CTR-006 — Sync from Authoring

Authoring ContractsDocs SHALL remain the canonical YAML source. The package SHALL provide a documented sync (`npm run sync-schemas` / `contracts:sync`) that re-copies YAML from Authoring into the package. Package YAML SHALL match Authoring after sync.

#### SRD-CTR-007 — Load helper

The package SHALL export a documented function that loads a contract document by name (`sales`, `inventory`, `accounting`, `common`) or by known intent code.

#### SRD-TAX-009 — AI suggests known intents only

AI helpers MAY suggest known intent codes from the published list; they SHALL NOT invent tools, connectors, or payloads. Execution remains allowlisted skills only. Aligns with parent **SRD-EDGE-007**, **SRD-SEC-002**.

## Trace

| ID | Scenario | Test plan |
|----|----------|-----------|
| SRD-TAX-001 … 009 · SRD-CTR-001 … 007 | [OPS-010](./Scenarios/OPS-010.md) | [TP-OPS-010](../../TestPlans/OPS-010/TP-OPS-010.md) |
| SRD-TAX-009 | [OPS-020](./Scenarios/OPS-020.md) | [TP-OPS-020](../../TestPlans/OPS-020/TP-OPS-020.md) |
| Pack / docs alignment (supporting) | [E-01](../Scenarios/E-01.md) | [TP-E-01](../../TestPlans/E-01/TP-E-01.md) |
