# Task queue — Diagrams

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
stateDiagram-v2
  [*] --> pending
  pending --> needs_approval
  pending --> running
  needs_approval --> running
  needs_approval --> rejected
  running --> completed
  running --> failed
  completed --> [*]
  failed --> [*]
  rejected --> [*]
```
