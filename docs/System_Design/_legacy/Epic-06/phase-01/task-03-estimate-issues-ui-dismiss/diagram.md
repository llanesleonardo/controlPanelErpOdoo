# Estimate issues UI dismiss — diagram

```mermaid
flowchart LR
  UI[Estimates_UI]
  GW[Gateway]
  PG[(EstimateIssue)]

  UI -->|list| GW
  UI -->|dismiss| GW
  UI -->|find| GW
  GW --> PG
```
