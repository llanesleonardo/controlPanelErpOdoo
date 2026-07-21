# Documentation Index

OpenClaw–Odoo control panel — **scaffold + references**. Implement features one task at a time.

| Doc | Purpose |
|-----|---------|
| **[Architecture overview](./architecture-overview.md)** | Five layers, stack, DB split |
| [Monorepo layout](./monorepo-layout.md) | `apps/`, `packages/`, `docker/` |
| [Request lifecycle](./request-lifecycle.md) | Deterministic 10-step flow |
| [Reliability rules](./reliability-rules.md) | No free-form Odoo writes |
| [Learning loop](./learning-loop.md) | Incidents → runbooks |
| [Governance](./governance-ownership.md) | Ownership and skill gates |
| **[Epic-01](./Epic-01/)** | Foundation + MVP shell tasks |

## Hierarchy

```
Epic-NN / phase-NN / task-NN-<slug> / {SRD,TSD,diagram,conops}.md
```

## Other roots

- [Components](../Components/)
- [Deployment](../Deployment/)
- [Software Patterns Docs](../Software%20Patterns%20Docs/) (synced from npm)
