# Flow — OPS-002 dry-run preview

```mermaid
flowchart TD
  Start([Start]) --> Task[Create task dry_run]
  Task --> GW[Gateway]
  GW --> Orch[Allowlisted skill]
  Orch --> Preview[Predicted effects]
  Preview --> NoWrite[No edge business commit]
  NoWrite --> Stop([Stop])
```
