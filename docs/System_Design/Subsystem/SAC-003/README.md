# SAC-003 - Shared vocabulary - taxonomy and contracts

The shop (and later helpers) must mean the same thing by “read estimate” or “adjust stock.” This piece is the **shared dictionary**: controlled intent codes (`{domain}.{entity}.{verb}`) and sample YAML contracts for work across peer edges. **ERP (Odoo today) is SoA peer #1** — taxonomy names the work; it does **not** make ERP the sole system of record for every property. Contracts describe inputs, dry-run vs commit, and policy fields.

Reference path for a carbide shop: estimate → buy → make → inspect → ship (drawings and inventory included). The same vocabulary pattern rebinds when the product is replicated for another company.

## What you get

| Piece | Job |
|-------|-----|
| TaxonomyDocs | Domains, entities, verbs, result states, error classes, approval levels |
| ContractsDocs | Sample Intent / Task / Skill YAML (Sales, Inventory, Accounting + common) |
| `@control-panel-ontology/contracts` | Importable package under `resources/packages/contracts` — constants + synced YAML |

**Authoring is canonical** under [Authoring/](./Authoring/). Builders edit docs there, then sync YAML into the package. Do not invent intent codes only in app code. AI may **suggest** known codes only ([OPS-020](./Scenarios/OPS-020.md)).

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true for vocabulary and contracts |
| [TSD.md](./TSD.md) | Package layout, taxonomy exports, sync-schemas |
| [TRACE.md](./TRACE.md) | Requirement to scenario to test |
| [Scenarios/OPS-010.md](./Scenarios/OPS-010.md) | Classify / resolve a known intent code |
| [Scenarios/OPS-020.md](./Scenarios/OPS-020.md) | AI suggests intent; human/skill executes |
| [Authoring/](./Authoring/) | ContractsDocs + TaxonomyDocs (edit here) |

Runtime package: [`resources/packages/contracts`](../../../../resources/packages/contracts/). Layout: [Monorepo_Layout](../../TSD/Monorepo_Layout.md).

**Shop how-to:** [User Guide](../../../User_Guide/README.md)
