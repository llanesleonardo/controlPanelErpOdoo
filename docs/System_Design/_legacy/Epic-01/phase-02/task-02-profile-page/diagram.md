# Profile page — Diagrams

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
flowchart LR
  ProfileUI[Profile_page]
  Gw[Gateway]
  User[(User_row)]
  ProfileUI -->|GET_PATCH| Gw
  Gw --> User
```
