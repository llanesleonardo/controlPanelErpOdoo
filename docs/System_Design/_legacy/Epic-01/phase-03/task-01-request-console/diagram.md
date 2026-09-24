# Request console — Diagrams

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
flowchart TD
  Console[Request_console]
  Classify[Classify_intent]
  Task[Create_task]
  Queue[Task_queue]
  Console --> Classify
  Classify --> Task
  Task --> Queue
```
