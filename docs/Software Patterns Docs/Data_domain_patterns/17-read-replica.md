# Read Replica

## Core Idea
Read Replica copies data from a primary database to one or more replicas used for read traffic.

## Problem It Solves
- Read workload is overloading the primary database or needs geographic/local read scaling.

## Main Diagram
```text
(Primary DB) -> (Read Replica 1) -> (Read Replica 2) -> Application Reads
```

## 3 Concrete Examples
1. **Reporting Replica:** Reports query a replica so operational writes are not slowed down.
2. **Web Read Scaling:** Product pages read from replicas while writes go to primary.
3. **Regional Replica:** Users in another region read from a nearby replica.

## TypeScript Example
```typescript
const primary = connect('postgres-primary');
const replica = connect('postgres-replica');
async function getOrder(id: string) { return replica.query('SELECT * FROM orders WHERE id=$1', [id]); }
async function createOrder(o: Order) { return primary.query('INSERT INTO orders ...', [o]); }
await createOrder({ id: 'O-1', total: 99 });
const view = await getOrder('O-1');
```

## Architecture Questions
- Can reads tolerate replication lag?
- Which queries should use replicas?
- How is failover handled?
- How stale can replica data be?
- How are read-after-write expectations handled?
- How is replica health monitored?

## When to Use
- Read traffic is high.
- Reads can tolerate lag.
- You need reporting or regional read scaling.

## When NOT to Use
- Reads must always reflect latest writes.
- Replication lag is unacceptable.
- Operational complexity is not justified.
