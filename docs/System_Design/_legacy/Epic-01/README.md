# Epic-01 — Foundation and MVP shell (docs / scaffold)

## Status

docs-complete

This epic finishes **documentation and scaffold planning** for the OpenClaw–Odoo control panel. It does **not** implement NestJS, Next.js, or FastAPI applications.

Application build (auth UI, gateway, orchestrator, live Odoo connector) belongs in later epics. Foundation package/Compose work is tracked in **[Epic-02](../Epic-02/)**.

## Phases

| Phase | Focus | Status |
|-------|--------|--------|
| [phase-01](./phase-01/) | Foundation — taxonomy, contracts, docs/monorepo, Docker strategy | docs-complete |
| [phase-02](./phase-02/) | Control-plane shell — auth/users/roles, profile, theme | docs-complete |
| [phase-03](./phase-03/) | Ops surfaces — request console, task queue, logging, rate limits | docs-complete |
| [phase-04](./phase-04/) | Integrations — Odoo page, dry-run path, storage/backups | docs-complete |

## Rule

Every task folder contains `SRD.md`, `TSD.md`, `diagram.md`, `conops.md`, each marked **docs-complete** for Epic-01.

## What exists in the repo after Epic-01

- PeopleForms-aligned `docs/` tree and Component/Deployment references
- Stub `apps/*` and `packages/contracts` READMEs
- Docker Compose stubs and `.env.example`
- Synced Software Patterns Docs + markdown lint CI

## Next epic

**[Epic-02 — Foundation implementation](../Epic-02/)** implements Epic-01 Phase 01 deliverables (taxonomy/contracts packages, npm workspaces, runnable Postgres). NestJS/Next.js/FastAPI apps remain later.
