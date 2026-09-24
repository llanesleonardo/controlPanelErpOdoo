# npm workspaces — Software Requirements Document (SRD)

**Status:** implemented (Epic-02)  
**Upstream:** [Epic-01 monorepo](../../../Epic-01/phase-01/task-03-monorepo-docs-shape/SRD.md) · [monorepo-layout](../../../../TSD/Monorepo_Layout.md)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose

Wire the monorepo so `packages/contracts` installs as a workspace package from the repo root.

## Scope

- Root `package.json` `workspaces` including `packages/*` (and optionally `apps/*` stubs)
- Named package for contracts (e.g. `@control-panel-erp/contracts`)
- `npm install` from root links the workspace
- Update root README / monorepo-layout with workspace commands

## Out of Scope

- Generating NestJS/Next.js apps inside `apps/*`
- pnpm/turborepo migration (npm workspaces is the default)

## Requirements

### SRD-E02-P01-T03-01

**Workspaces enabled** — Root package.json shall declare workspaces for `packages/*`.

### SRD-E02-P01-T03-02

**Installable contracts** — `npm install` at root shall make `@control-panel-erp/contracts` (or chosen name) resolvable.

### SRD-E02-P01-T03-03

**Docs updated** — monorepo-layout and packages/contracts README shall describe workspace usage.

### SRD-E02-P01-T03-04

**Lint preserved** — `npm run lint` shall remain green.
