# Epic-02 — Foundation implementation

## Status

phase-01 implemented (foundation packages + Postgres Compose)

Implements **runtime/scaffold deliverables** for the foundation documented in [Epic-01 Phase 01](../Epic-01/phase-01/). Does **not** build NestJS/Next.js/FastAPI apps or auth UI.

**Upstream docs:** [Epic-01 / phase-01](../Epic-01/phase-01/README.md) (docs-complete)

## Phase

| Phase | Focus |
|-------|--------|
| [phase-01](./phase-01/) | Foundation implementation — taxonomy package, contracts package, workspaces, runnable Postgres |

## Rule

Every task folder contains `SRD.md`, `TSD.md`, `diagram.md`, `conops.md`. Trace requirements to Epic-01 Phase 01 packs where applicable.

## Out of scope

- `apps/web`, `apps/gateway`, `apps/orchestrator` application frameworks
- Auth, profile, theme, console, Odoo connector runtime (later epics)
