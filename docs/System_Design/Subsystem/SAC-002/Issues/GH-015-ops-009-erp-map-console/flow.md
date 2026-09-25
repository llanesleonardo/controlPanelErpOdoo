# Flow — OPS-009 map to console

```mermaid
flowchart TD
  Start([Start]) --> Map[Shop Map]
  Map --> Sec[Section intent]
  Sec --> Con[Console]
  Con --> GW[Gateway classify]
  GW --> Stop([Stop])
```
