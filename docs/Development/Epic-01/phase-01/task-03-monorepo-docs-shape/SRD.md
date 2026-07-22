# Monorepo and docs shape — Software Requirements Document (SRD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [monorepo-layout](../../../monorepo-layout.md)

## Purpose

Lock the repository layout: apps, packages, docker, and four peopleForms-aligned docs roots.

## Scope

- Folder skeleton and stub READMEs for `apps/web`, `apps/gateway`, `apps/orchestrator`, `packages/contracts`
- Docs roots: Components, Deployment, Development, Software Patterns Docs
- Development hierarchy: Epic → Phase → Task with SRD/TSD/diagram/conops
- Patterns sync via `@llanesleonardo/software-patterns-docs`
- Lint CI for authored markdown

## Out of Scope

- Generating NestJS / Next.js / FastAPI application projects (later epic)
- Changing the four-root docs convention

## Requirements

### SRD-E01-phase-01-T03-01

**Layout published** — Root README and Development monorepo-layout shall describe the locked folder structure.

### SRD-E01-phase-01-T03-02

**Docs hierarchy** — Development work shall be organized as Epic / phase / task packs with the four required files.

### SRD-E01-phase-01-T03-03

**Patterns sync** — Software Patterns Docs shall be synced from the npm package, not hand-authored as a duplicate library.

### SRD-E01-phase-01-T03-04

**Stub apps only** — `apps/*` remain README stubs in Epic-01.
