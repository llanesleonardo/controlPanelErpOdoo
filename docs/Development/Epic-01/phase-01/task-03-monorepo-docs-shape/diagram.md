# Monorepo and docs shape — Diagrams

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
flowchart TB
  subgraph docs [docs]
    Comp[Components]
    Dep[Deployment]
    Dev[Development]
    Pat[Software_Patterns_Docs]
  end
  subgraph code [scaffold]
    Web[apps_web_stub]
    Gw[apps_gateway_stub]
    Orch[apps_orchestrator_stub]
    Ctr[packages_contracts_stub]
    Dock[docker_stubs]
  end
  Dev --> Comp
  Dev --> Dep
  Dev --> Pat
```
