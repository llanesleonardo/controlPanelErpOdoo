# Documentation Index

Control plane for **governed intents/skills** across first-party connectors (Odoo is connector #1). Implement features one task at a time.

| Doc | Purpose |
|-----|---------|
| **[Architecture overview](./architecture-overview.md)** | Layers, multi-connector control plane, DB split |
| **[Connectors](./connectors.md)** | Product-owned connector SPI + ship-one-by-one catalog |
| **[Platform concerns](./platform-concerns.md)** | Auth, multi-tenant, logging, retry, Docker, NestJS-as-gateway |
| **[Pattern map](./pattern-map.md)** | Best-fit patterns from Software Patterns Docs |
| **[Governed execution](./governed-execution.md)** | Why NL routes; only certified skills execute |
| [Monorepo layout](./monorepo-layout.md) | `apps/`, `packages/`, `docker/` |
| [Request lifecycle](./request-lifecycle.md) | Deterministic flow including connector resolve |
| [Reliability rules](./reliability-rules.md) | No free-form SoR/NL writes; ACL + allowlist |
| [Learning loop](./learning-loop.md) | Incidents → runbooks |
| [Governance](./governance-ownership.md) | Ownership and skill gates |
| **[Epic-01](./Epic-01/)** | Foundation + MVP shell — **docs-complete** (scaffold only) |
| **[Epic-02](./Epic-02/)** | Foundation implementation — **phase-01 done** (contracts package, workspaces, Postgres Compose) |
| **[Epic-03](./Epic-03/)** | Ops surfaces — **done** (logging, rate limit, console, task queue) |
| **[Epic-04](./Epic-04/)** | Integrations — **done** (Odoo connector #1, dry-run path, storage/backups) |
| **[Epic-05](./Epic-05/)** | ERP Map & first live read — **done** (module grid, intent rail/catalog, `sales.estimate.read`) |
| **[Epic-06](./Epic-06/)** | Connector model + estimate issues — **docs drafted; implementation not started** |

## Hierarchy

```
Epic-NN / phase-NN / task-NN-<slug> / {SRD,TSD,diagram,conops}.md
```

## Other roots

- [Components](../Components/)
- [Deployment](../Deployment/)
- [Software Patterns Docs](../Software%20Patterns%20Docs/) (synced from npm)
