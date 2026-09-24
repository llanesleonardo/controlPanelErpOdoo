# SAC-003 — Shared vocabulary — taxonomy and contracts

The shop (and later helpers like OpenClaw) must mean the same thing by “read estimate” or “adjust stock.” This piece is the **shared dictionary**: controlled intent codes (`{domain}.{entity}.{verb}`) and sample YAML contracts. Your **ERP (Odoo)** stays the system of record — taxonomy names the work; contracts describe inputs, dry-run vs commit, and policy fields.

## What you get

| Piece | Job |
|-------|-----|
| TaxonomyDocs | Domains, entities, verbs, result states, error classes, approval levels |
| ContractsDocs | Sample Intent / Task / Skill YAML (Sales, Inventory, Accounting + common) |
| `@control-panel-erp/contracts` | Importable package under `resources/packages/contracts` — constants + synced YAML |

**Authoring is canonical** under [Authoring/](./Authoring/). Builders edit docs there, then sync YAML into the package. Do not invent intent codes only in app code.

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true for vocabulary and contracts |
| [TSD.md](./TSD.md) | Package layout, taxonomy exports, sync-schemas |
| [TRACE.md](./TRACE.md) | Requirement → scenario → test |
| [Scenarios/OPS-010.md](./Scenarios/OPS-010.md) | Classify / resolve a known intent code |
| [Authoring/](./Authoring/) | ContractsDocs + TaxonomyDocs (edit here) |

Runtime package: [`resources/packages/contracts`](../../../../resources/packages/contracts/). Layout: [Monorepo_Layout](../../TSD/Monorepo_Layout.md).

**Shop how-to:** [User Guide](../../../User_Guide/README.md)  
**Legacy:** Epic-01 taxonomy/contracts · Epic-02 packages under [`_legacy/`](../../_legacy/).
