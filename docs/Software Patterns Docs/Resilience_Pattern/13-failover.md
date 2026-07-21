# Failover

## Core Idea
Failover switches traffic or responsibility from a failed component to a standby or alternate component.

## Problem It Solves
- A failed primary component should not make the whole service unavailable.

## Main Diagram
```text
Client -> Router / Failover Controller -> Primary -> Standby -> Health Check
```

## 3 Concrete Examples
1. **Database Failover:** A standby database is promoted when the primary fails.
2. **Region Failover:** Traffic moves to another region during regional outage.
3. **Load Balancer Failover:** Traffic stops going to unhealthy instances and shifts to healthy ones.

## TypeScript Example
```typescript
const primary = 'db-primary';
const secondary = 'db-secondary';
async function query(sql: string) {
  try { return await db[primary].query(sql); }
  catch { return await db[secondary].query(sql); }
}
```

## Architecture Questions
- What failure triggers failover?
- What component becomes the replacement?
- Is failover automatic or manual?
- How is data consistency maintained?
- How is split-brain prevented?
- How is failback handled?

## When to Use
- A backup component exists.
- Availability matters.
- Failure detection and promotion are designed.

## When NOT to Use
- Standby is untested.
- Data consistency during promotion is unclear.
- Split-brain prevention is missing.
