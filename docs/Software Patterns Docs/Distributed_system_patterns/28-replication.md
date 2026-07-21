# Replication

## Core Idea
Replication copies data from one node to others, synchronously or asynchronously.

## Problem It Solves
- A system needs copies of data for availability, read scaling, disaster recovery, or locality.

## Main Diagram
```text
(Primary DB) -> (Replica 1) -> (Replica 2) -> (Replica 3)
```

## 3 Concrete Examples
1. **Read Replicas:** Read traffic goes to replicas while writes go to primary.
2. **Cross-Region Disaster Recovery:** Data is replicated to another region.
3. **Multi-Replica Database:** Several replicas hold copies for high availability.

## TypeScript Example
```typescript
async function replicate(entry: LogEntry) {
  const results = await Promise.all(replicas.map(r => r.append(entry)));
  if (results.filter(Boolean).length >= quorum) commit(entry);
}
// Read Replicas:
await replicate();
```

## Architecture Questions
- Is replication synchronous or asynchronous?
- What is the source of truth?
- Can reads be stale?
- How is failover handled?
- How are conflicts resolved?
- What replication lag is acceptable?

## When to Use
- Read scaling is needed.
- Availability and failover matter.
- Disaster recovery is required.
- Geographic locality is useful.

## When NOT to Use
- Strictly fresh reads are required everywhere and async replication is used.
- Conflict handling is not understood.
- Replication complexity is unnecessary for the scale.
