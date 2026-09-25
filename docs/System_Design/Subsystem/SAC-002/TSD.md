# SAC-002 - Technical Design (TSD)

How Next.js screens help a carbide shop pick intents and run work through the gateway — including future **analytics/workflow** views that must not call vendor APIs from the browser (**SRD-UI-004**, OPS-017).

Parent: [ControlPanelOntology_TSD](../../TSD/ControlPanelOntology_TSD.md) · Patterns: [Pattern_Selection](../../TSD/Pattern_Selection.md)  
**OPS:** 009, 017 (all Open)

## Model

```mermaid
flowchart LR
  Map[Shop_Map]
  Sec[Section_intents]
  Con[Console]
  Ont[Ontology_shell]
  An[Analytics_views]
  Gw[NestJS_gateway]
  Map --> Sec
  Sec -->|consoleHref| Con
  Con --> Gw
  Ont --> Gw
  An --> Gw
  Map -.-> Gw
```

UI composition stays in `apps/web`. Data plane stays behind SAC-001.

## Stack

| Piece | Choice |
|-------|--------|
| App | Next.js App Router - `apps/web` |
| Shell | `AppShell` - main nav, theme toggle, intents rail on `/sections/*` |
| Section catalog | `apps/web/lib/erp-sections.ts` |
| Intent catalog | `apps/web/lib/section-intents.ts` - `resolveIntentDetail`, `classifyIntentProfile`, `consoleHrefForIntent` |
| API client | `apps/web/lib/api.ts` - gateway base URL + `X-Actor-Id` / correlation |
| Theme | `data-theme` on `<html>`; `localStorage` key `cp-theme`; CSS variables in `globals.css` |

## Routes

| Route | Role |
|-------|------|
| `/` | ERP Map - `ErpAppsGrid` module tiles |
| `/sections/[slug]` | Section workspace + intent detail; dual sidebar |
| `/console` | Request console - classify + create task |
| `/tasks`, `/tasks/[id]` | Task queue UI |
| `/logs` | Structured logs UI |
| `/ontology` | Tab host: Schema / Explorer / Vertex / Process map |
| `/integrations/odoo` | Connector settings UI (SAC-005) |
| `/profile` | Planned with auth |

## ERP Map and section shell

- Home tiles link to `/sections/:slug` for every mapped module.
- On section routes only: **IntentRail** (search label/code/status/difficulty; collapsible). Mobile: intents from top bar.
- Intent rail offset tracks main sidebar collapsed width.
- Section accordion stays open when path starts with `/sections`.
- Guardrail: no Odoo credentials or free-form RPC in map/section UI.

## Intent catalog and profiles

Difficulty classes (deterministic):

| Class | Meaning | Example |
|-------|---------|---------|
| `simple` | Single fetch | `sales.estimate.read` |
| `structured` | Typed mutate | `sales.quotation.create` |
| `diagnostic` | Multi-read + rules | `sales.estimate.find_issues` |
| `nl_compose` | NL ? grounded extract ? write | `sales.estimate.create_from_text` |

Default call-path sketch (UI copy): `intent` → `POST /skills/execute` (or dry-run) → **connector catalog** → peer edge. Taxonomy codes stay `{domain}.{entity}.{verb}`. Extend catalogs in code / contracts — do not invent codes in the browser.

## Request console

- Fields: intent text / code, domain, execution mode (`dry_run` | `commit`), optional structured payload.
- Actions: Classify → review `intent_code` → Confirm create task.
- Gateway: `POST /intents/classify` (contracts taxonomy), `POST /tasks` (policy with SAC-007).
- Prefill via query: `consoleHrefForIntent(code)` → `/console?intent_code=&domain=`.

## Analytics / workflow views (OPS-017 / SRD-UI-004)

| Rule | Design |
|------|--------|
| Data access | Only `gatewayFetch` → ontology/skills/tasks APIs |
| Forbidden | Browser credentials or direct ERP/MES/data URLs |
| v1 | Section tables + Explorer satisfy the pattern; dedicated analytics panels reuse the same client |
| Failure | Honest degraded messaging — no fabricated “live” rows |

## Ontology UI shell

`/ontology` hosts four tabs; SAC-006 owns catalog semantics and live Explorer. SAC-002 ensures nav entry, layout chrome, and gateway fetches only.

## Theme and profile

| Concern | v1 | Later |
|---------|----|--------|
| Theme | Toggle in shell; `light` \| `dark`; localStorage | Optional `system`; `User.theme_preference` via `PATCH /profile` |
| Profile | Not required for Map/Console | `/profile` - display_name, roles, password change; `GET/PATCH /profile`, `POST /profile/password` |

If profile save fails after auth exists: keep local theme preference and show a non-blocking warning.

## Hardening / UX notes

- Keep black-on-black dark shell consistent with shipped Epic-05 tokens; avoid purple-default AI chrome when extending styles.
- Progressive disclosure: intents rail only on section routes.
- All `gatewayFetch` calls go to NestJS - never to Odoo.

## Related

- [SAC-006](../SAC-006/TSD.md) · [OPS-009](./Scenarios/OPS-009.md) · [OPS-017](./Scenarios/OPS-017.md) · [User Guide Screens](../../../User_Guide/Screens/README.md)
