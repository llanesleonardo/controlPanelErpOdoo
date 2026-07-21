# Active-Passive

## Core Idea
Active-Passive runs one active component while a passive standby waits to take over during failure.

## Problem It Solves
- The system needs failover capability without the complexity of serving traffic from multiple active sites.

## Main Diagram
```text
Client -> Failover Router -> Active Primary -> Passive Standby -> Replication
```

## 3 Concrete Examples
1. **Primary-Standby Database:** Primary handles writes; standby receives replication and is promoted on failure.
2. **Disaster Recovery Region:** A passive region is kept warm and receives traffic only during outage.
3. **Hot Standby Service:** A standby instance is ready but does not serve traffic until failover.

## TypeScript Example
```typescript
let active: 'primary' | 'standby' = 'primary';
async function serve(req: Request) {
  const node = active === 'primary' ? primary : standby;
  if (!node.healthy) { active = 'standby'; return standby.handle(req); }
  return node.handle(req);
}
```

## Architecture Questions
- Is the standby cold, warm, or hot?
- How current is standby data?
- What triggers promotion?
- How long does failover take?
- How is split-brain avoided?
- How is failback performed?

## When to Use
- Failover is needed but active-active is too complex.
- Standby data can be kept sufficiently fresh.
- Failover time is acceptable.

## When NOT to Use
- Failover time is too long.
- Standby is not kept current.
- Manual failover procedures are untested.
