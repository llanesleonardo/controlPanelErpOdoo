# Replication

## Core Idea
Replication copies data from one node to other nodes for availability, read scaling, disaster recovery, or locality.

## Problem It Solves
- A single data copy is a bottleneck and a failure risk.

## Main Diagram
```text
(Primary) -> (Replica 1) -> (Replica 2) -> (Replica 3) -> Read Traffic
```

## 3 Concrete Examples
1. **Primary-Replica Database:** Writes go to primary while replicas serve read traffic.
2. **Cross-Region Replication:** Data is replicated to another region for disaster recovery.
3. **Search Index Replication:** Search index replicas allow many query nodes to serve the same data.

## TypeScript Example
```typescript
await primary.write(record);
for (const replica of replicas) replica.replicate(record);
const record = { id: 'r-1', payload: data };
const view = await replicas[0].read(record.id);
```

## Architecture Questions
- Is replication synchronous or asynchronous?
- Can reads tolerate replication lag?
- What is the source of truth?
- How is failover handled?
- How are conflicts resolved?
- What data loss window is acceptable?

## When to Use
- Read scaling, availability, disaster recovery, or locality is needed.
- Replica lag can be managed.
- Failover and consistency rules are understood.

## When NOT to Use
- Strictly fresh reads are required everywhere.
- Conflict resolution is unclear.
- Replication lag would break business expectations.
