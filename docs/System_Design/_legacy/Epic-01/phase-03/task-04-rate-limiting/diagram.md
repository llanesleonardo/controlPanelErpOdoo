# Rate limiting — Diagrams

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
flowchart LR
  Client[Client]
  RL[Rate_limit_middleware]
  Gw[Gateway_handlers]
  Client --> RL
  RL -->|under_limit| Gw
  RL -->|over_limit| R429[HTTP_429]
```
