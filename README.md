# ControlPanelERP

External **OpenClaw → Odoo 18** control panel. This repo is a **scaffold + reference docs** pass — not a full application build.

## Stack (planned)

| Layer | Choice |
|-------|--------|
| Control panel UI | Next.js (`apps/web`) |
| API gateway | NestJS (`apps/gateway`) |
| OpenClaw orchestration | FastAPI (`apps/orchestrator`) |
| Control-plane DB | PostgreSQL (separate from Odoo) |
| Runtime | Docker Compose (local + Linux later) |

## Docs

Start here: [docs/Development/README.md](docs/Development/README.md)

| Folder | Role |
|--------|------|
| [docs/Components](docs/Components/) | Product-surface references |
| [docs/Deployment](docs/Deployment/) | Docker / hosting |
| [docs/Development](docs/Development/) | Architecture, Epic → Phase → Task packs |
| [docs/Software Patterns Docs](docs/Software%20Patterns%20Docs/) | Synced from `@llanesleonardo/software-patterns-docs` |

## Monorepo layout

```
apps/web            Next.js control panel (stub)
apps/gateway        NestJS API gateway (stub)
apps/orchestrator   FastAPI OpenClaw orchestration (stub)
packages/contracts  Shared API contracts (stub)
docker/             Compose stubs
docs/               Four-root documentation tree
```

## Patterns sync

Requires a GitHub token with `read:packages` and `.npmrc` configured for `@llanesleonardo`.

```bash
# Set NODE_AUTH_TOKEN to a GitHub PAT with read:packages
npm install
npm run docs:sync-patterns
```

See [docs/Software Patterns Docs/README.md](docs/Software%20Patterns%20Docs/README.md).

## Lint

```bash
npm run lint
```

Authored markdown under Components / Deployment / Development (not the synced Software Patterns Docs tree). CI: [`.github/workflows/lint.yml`](.github/workflows/lint.yml) — set repo secret `NODE_AUTH_TOKEN` for `npm ci`.

## Implementation approach

Features are delivered one **task** at a time under `docs/Development/Epic-NN/phase-NN/task-NN-<slug>/` using `SRD.md`, `TSD.md`, `diagram.md`, and `conops.md`. Do not build the whole app in one pass.
