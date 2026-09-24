# SAC-010 — Technical Design (TSD)

What the repo **actually** runs for quality gates, and what we **intend** next — no phantom pipelines.

Parent: [ControlPanelERP_TSD](../../TSD/ControlPanelERP_TSD.md) · Layout: [Monorepo_Layout](../../TSD/Monorepo_Layout.md).

## Current CI

### Workflow: Lint

File: [`.github/workflows/lint.yml`](../../../../.github/workflows/lint.yml)

| Item | Value |
|------|--------|
| Triggers | `push` to `main` / `master`; all `pull_request` |
| Runner | `ubuntu-latest` |
| Node | 20 |
| Install | `npm ci` (GitHub Packages auth via `NODE_AUTH_TOKEN` for scoped patterns package) |
| Command | `npm run lint` |

There are **no other** workflows under `.github/workflows/` at this writing (no contracts job, no Docker build job, no release job).

### Root scripts (local / checklist)

From root `package.json`:

| Script | Role |
|--------|------|
| `npm run lint` | `markdownlint` over docs, apps, packages, docker, `.github` markdown, READMEs |
| `npm run test:contracts` | Workspace test for `@control-panel-erp/contracts` |
| `npm run test:ontology` | Workspace test for `@control-panel-erp/ontology` |
| `npm run docs:sync-patterns` | Patterns docs sync (needs `NODE_AUTH_TOKEN`) — **not** a CI gate today |

```mermaid
flowchart LR
  PR[pull_request_or_push]
  GHA[lint.yml]
  Lint[npm_run_lint]
  Local[developer_machine]
  Smokes[test_contracts_ontology]
  PR --> GHA --> Lint
  Local --> Lint
  Local --> Smokes
```

## Planned (honest backlog)

| Item | Notes |
|------|--------|
| CI steps for `test:contracts` / `test:ontology` | Same Node setup as Lint; fail PR on red smoke |
| Gateway / web / orchestrator tests | Add when meaningful suites exist |
| Optional Compose smoke | Could reuse OPS-007 checks — not automated yet |
| Release workflow | Tag → attach lint + smoke logs + pointer to TestPlans reports |

## Release evidence expectations (manual until automated)

When cutting a version operators/developers care about:

1. Lint workflow green (or attach lint log).  
2. Run and keep output of `npm run test:contracts` and `npm run test:ontology`.  
3. For claimed ops capabilities, point at the matching `TP-OPS-*` report under `docs/System_Design/TestPlans/`.  
4. Confirm no secrets in the tree being tagged.

## Legacy / harvest

- `_legacy/Epic-01` monorepo-docs: run `npm run lint` before commit  
- `_legacy/Epic-02` taxonomy/contracts/workspaces: package smoke; lint stays green  
- Live workflow: `.github/workflows/lint.yml`
