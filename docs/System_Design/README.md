# ControlPanelERP — System Design Pack

Friendly V-Model docs for the **control panel** that sits next to your shop’s **ERP**.

**Who it’s for:** a small company that makes **carbide tools** — with machines, people, inspections, customer drawings, inventory, and shipping (your dock or a third-party carrier). Day-to-day records stay in the ERP. This product helps you run **safe, approved, auditable** actions against that ERP (and later other systems).

## How we work (V-Model)

```text
ConOps → SRD → TSD → Build
     → Check with scenarios & test plans → Confirm in the real shop
```

Trace rule: **requirement → scenario → test plan**.

## Documents

| Document | What it answers | Path |
|----------|-----------------|------|
| **ConOps** | How the shop should use the control panel day to day | [ConOps/ControlPanelERP_ConOps.md](ConOps/ControlPanelERP_ConOps.md) |
| **SRD** | What the system SHALL do (testable) | [SRD/ControlPanelERP_SRD.md](SRD/ControlPanelERP_SRD.md) |
| **Parent TSD** | How we design and build it | [TSD/ControlPanelERP_TSD.md](TSD/ControlPanelERP_TSD.md) |
| **Pattern selection** | Which patterns we use (agent entry: impact / risk / Diff) | [TSD/Pattern_Selection.md](TSD/Pattern_Selection.md) |
| **Subsystems (SAC)** | Each major piece of the product | [Subsystem/README.md](Subsystem/README.md) |
| **Risks / gaps** | What’s deferred or only partly done | [Subsystem/Risks.md](Subsystem/Risks.md) |
| **Scenarios** | Shop stories we care about | [Subsystem/SCENARIOS.md](Subsystem/SCENARIOS.md) |
| **Test plans** | How we check those stories | [TestPlans/README.md](TestPlans/README.md) |
| **Templates** | Blank forms for new docs | [Templates/README.md](Templates/README.md) |
| **Document tree** | Map of this pack | [DOCUMENT_TREE.md](DOCUMENT_TREE.md) |

## Honest progress

| Side | Status |
|------|--------|
| Left (ConOps / SRD / TSD / SAC) | **Draft 0.2** — Epic packs fully rewritten into SAC README/SRD/TSD/TRACE + OPS-001…012 |
| Build (apps) | Ahead of some formal gaps — live estimate read, ops UI, ontology Schema / Explorer / Vertex / Process map |
| Right (tests) | Mostly **Not run**; some Partial where smoke already exists |
| Gaps 04–06 (Manager / Explorer / Vertex first slices) | **Satisfied (v1 slice)** — residuals listed in Risks |
| Gaps 01–03, 07–08 | Still **Deferred** (estimate-issues runtime = GAP-02 / OPS-011) |

## Older Epic folders

Past Epic → Phase → Task packs live under [`_legacy/`](_legacy/) for **history only** (do not author there). Substance has been promoted into parent ConOps/SRD/TSD and each SAC. **This pack is the living process.**

## Sibling docs

- [User Guide](../User_Guide/) — how the shop uses the panel  
- [Software Patterns Docs](../Software%20Patterns%20Docs/) — synced library (**by type**). For agents: start at [Pattern_Selection](TSD/Pattern_Selection.md) (impact / risk / Diff), then one pattern file. **Recognition examples** → [`recognition_examples/`](../Software%20Patterns%20Docs/recognition_examples/); **composition problems** → [`composition_problems/`](../Software%20Patterns%20Docs/composition_problems/) (problems / concerns / exercises; skip exercises for implementation).  
- Runtime / Compose: [SAC-009](Subsystem/SAC-009/README.md)  
