# SAC-002 - Screens - Map, console, ontology UI

Screens estimators and floor leads use every day: a home **Map** (module tiles like Estimates, Inventory, Shipping — UI may still say “ERP Map”), section pages with selectable **intents** (named actions, not guessed codes), the **Request console** to classify and queue work, plus Tasks, Logs, Profile/theme chrome, and the `/ontology` shell that hosts the business-map tabs.

The Map is a **launcher**, not a claim that ERP owns every property. Live rows come from the **owning peer** through allowlisted skills (often the ERP SoA peer for Estimates today). The UI talks **only** to the NestJS gateway (SAC-001) — never browser-direct vendor APIs (including analytics/workflow surfaces).

## What you get

| Screen | Job |
|--------|-----|
| Map (`/`) | Pick a shop module tile to open a section workspace |
| Section (`/sections/[slug]`) | Browse that module's intents; open detail / jump to console |
| Console (`/console`) | Classify intent, then create task (dry-run or commit mode) |
| Tasks / Logs | Inspect queue and structured logs (ops surfaces; rules in SAC-007) |
| Ontology (`/ontology`) | Host Schema, Explorer, Vertex, Process map tabs (content in SAC-006) |
| Theme | Light / dark toggle; preference in local storage (profile sync later) |
| Profile | Planned `/profile` for display name / password when auth lands |

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true for screens |
| [TSD.md](./TSD.md) | Next.js shell, catalogs, console, ontology host |
| [TRACE.md](./TRACE.md) | Requirement to scenario to test |
| [Scenarios/OPS-009.md](./Scenarios/OPS-009.md) | Pick an intent from Map and open console |
| [Scenarios/OPS-017.md](./Scenarios/OPS-017.md) | Analytics / workflow reads via gateway |

Runtime: [`apps/web`](../../../../apps/web/). Parent: [SRD-UI-*](../../SRD/ControlPanelOntology_SRD.md).

**Shop how-to:** [Screens](../../../User_Guide/Screens/README.md)

## Related

- Front door: [SAC-001](../SAC-001/README.md)
- Ontology content: [SAC-006](../SAC-006/README.md) · Tasks/logs: [SAC-007](../SAC-007/README.md)
