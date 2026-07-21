# Read Replica

## Core Idea
Read Replica copies data from a primary database to replicas that serve read traffic.

## Problem It Solves
- Read workload overloads the primary database or needs lower-latency local reads.

## Main Diagram
```text
Application -> (Primary DB) -> (Read Replica 1) -> (Read Replica 2)
```

## 3 Concrete Examples
1. **Reporting Replica:** Reports query a replica so operational writes are not slowed down.
2. **Product Page Scaling:** High-volume product reads go to replicas while writes go to primary.
3. **Regional Replica:** Users in another region read from a nearby replica.

## TypeScript Example
```typescript
const writes = db.primary();
const reads = db.replica();
const uid = 'user-42';
await writes.insert({ userId: uid, total: 199 });
const list = await reads.query('SELECT * FROM orders WHERE user_id=$1', [uid]);
// reads hit replica; writes go to primary
```

## Architecture Questions
- Which queries should use read replicas?
- Can those reads tolerate lag?
- How is read-after-write handled?
- How is replica health monitored?
- What happens if a replica falls behind?
- Can the primary still handle writes under load?

## When to Use
- Read traffic is high.
- Reads can tolerate replication lag.
- Reports or dashboards should not overload the primary.

## When NOT to Use
- Read-after-write consistency is mandatory.
- Lag is unacceptable.
- The primary is bottlenecked by writes, not reads.
