# Dry-run execution path — Diagrams

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
flowchart TD
  Req[Task_request]
  Dry[dry_run_simulate]
  Appr[approval_if_needed]
  Commit[commit_execute]
  Verify[verify]
  Req --> Dry
  Dry --> Appr
  Appr --> Commit
  Commit --> Verify
```
