# Dark and light theme — Diagrams

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
flowchart LR
  Toggle[Theme_toggle]
  Local[localStorage_fallback]
  Profile[User_theme_preference]
  Shell[App_shell_CSS]
  Toggle --> Local
  Toggle --> Profile
  Profile --> Shell
  Local --> Shell
```
