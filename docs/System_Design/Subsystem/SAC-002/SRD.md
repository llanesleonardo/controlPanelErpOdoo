# SAC-002 — Software Requirements (SRD)

Plain screen rules for the carbide-shop control panel. Operators pick **intents** (named actions like “read estimates”) from the home **Map** (UI label may still say “ERP Map”) instead of typing mystery codes. The **ontology** is the hub for the business map; **ERP** is **SoA peer #1** among edges — the Map is a launcher, not a claim that ERP owns every property. The browser calls only the **gateway** (SAC-001).

Parent UI SHALLs: [SRD-UI-001…004](../../SRD/ControlPanelOntology_SRD.md).

## Scope

- Next.js control panel shell: Map / section workspaces, intent catalog UX
- Request console (classify → task)
- Tasks and Logs navigation (behavior owned with SAC-007)
- Ontology route shell with four tabs (tab content owned with SAC-006)
- Theme toggle; profile page (planned with real auth)
- Analytics / workflow consumption via gateway (not browser-direct vendor APIs)

## Out of scope

- Talking to Odoo or other peer edges from the browser
- Inventing new intent codes in the UI (extend product catalogs deliberately)
- Full auth login UI until SAC-001 auth ships (dev-actor stub is enough for ops screens)
- Implementing every diagnostic / NL-compose skill (catalog may show them as planned)

## Requirements

### SRD-SCR-001 — Map (shop modules)

The system SHALL provide a home Map (`/`) that presents mapped shop modules as equal tiles linking to section workspaces (`/sections/:slug`), so operators pick areas (Estimates, Inventory, Shipping, …) without guessing codes. Aligns with parent **SRD-UI-001**.

### SRD-SCR-002 — Section workspace + intents rail

Each section slug SHALL open a workspace with breadcrumb back to the map. On section routes, a second **intents** rail SHALL list that section’s intents, support search and collapse, and on small screens open via a top-bar control. Empty sections SHALL show a clear empty state.

### SRD-SCR-003 — Per-section intent catalog

Each section slug SHALL map to its own intent list (not one global undifferentiated list). Intent detail SHALL show objective/description, execution **profile** (difficulty class), and a call-path sketch that ends at gateway skills — not raw operator-authored vendor RPC. Dummy/simulate output tables SHALL be labeled until a skill is live.

### SRD-SCR-004 — Deterministic profiles

Intent difficulty / execution profile (`simple` | `structured` | `diagnostic` | `nl_compose`) SHALL be rule-based (explicit override or verb/suffix rules) with a visible reason string — not ML inventing tools. Aligns with parent **SRD-SEC-002** at the UI edge.

### SRD-SCR-005 — Open console from intent

Operators SHALL be able to jump from a selected intent into the Request console with intent code (and domain) prefilled when the catalog provides a console link.

### SRD-SCR-006 — Request console

The system SHALL provide a Console where an operator submits an intent with domain and execution mode (`dry_run` | `commit`), sees classified taxonomy `intent_code` (and warnings if any) before confirming, and on confirm creates a control-plane task. Aligns with parent **SRD-UI-002**.

### SRD-SCR-007 — Tasks and Logs screens

The UI SHALL provide Tasks and Logs routes so operators can classify / queue / inspect work (queue and log rules: SAC-007; parent **SRD-UI-002**, **SRD-OPS-***).

### SRD-SCR-008 — Ontology UI shell

The system SHALL provide `/ontology` hosting Schema, Explorer, Vertex, and Process map tabs. Aligns with parent **SRD-UI-003**. Tab *behavior* for catalog/live data is SAC-006; this SAC owns the shell route and navigation entry.

### SRD-SCR-009 — Theme

The product SHALL support at least `light` and `dark` themes with a toggle in shell chrome. Preference SHALL survive refresh (local storage v1; profile field when auth exists).

### SRD-SCR-010 — Profile (planned)

Authenticated users SHALL view and update their own profile (display name, role summary, password change with current-password confirmation) at `/profile` once control-plane auth ships. Until then, document the route as planned; do not block Map/Console on missing profile.

### SRD-SCR-011 — Gateway-only client

All control-plane API calls from the UI (including analytics / workflow surfaces) SHALL go to the NestJS gateway (actor + correlation headers). The UI SHALL NOT embed peer credentials or call connector / vendor URLs. Aligns with parent **SRD-UI-004**, **SRD-EDGE-006**.

## Trace

| ID | Scenario | Test plan |
|----|----------|-----------|
| SRD-SCR-001 … 005, 011 | [OPS-009](./Scenarios/OPS-009.md) | [TP-OPS-009](../../TestPlans/OPS-009/TP-OPS-009.md) |
| SRD-SCR-011 (analytics / workflow via gateway) | [OPS-017](./Scenarios/OPS-017.md) | [TP-OPS-017](../../TestPlans/OPS-017/TP-OPS-017.md) |
| SRD-SCR-006, 007 | [OPS-003](../SAC-007/Scenarios/OPS-003.md) (supporting) | [TP-OPS-003](../../TestPlans/OPS-003/TP-OPS-003.md) |
| SRD-SCR-008 | [OPS-004](../SAC-006/Scenarios/OPS-004.md) (supporting) | [TP-OPS-004](../../TestPlans/OPS-004/TP-OPS-004.md) |

Parent UI crosswalk: SCR-001/002→UI-001 · SCR-006/007→UI-002 · SCR-008→UI-003 · SCR-011→UI-004 / EDGE-006.
