# Leader Election

## Core Idea
Leader Election selects one node as the leader while others act as followers or standby nodes.

## Problem It Solves
- A distributed system has multiple nodes, but only one should perform a specific coordinating task at a time.

## Main Diagram
```text
Node A - Leader -> Node B - Follower -> Node C - Follower -> Coordination Store
```

## 3 Concrete Examples
1. **Scheduled Job Coordinator:** Only one node runs a periodic cleanup job.
2. **Cluster Primary Node:** One node coordinates writes or metadata updates.
3. **Failover Controller:** A backup node becomes leader if the current leader fails.

## TypeScript Example
```typescript
async function campaign(nodeId: string) {
  const lease = await etcd.grant(5);
  const ok = await etcd.put('/leader', nodeId, { lease });
  if (ok) runAsLeader(); else runAsFollower();
}
// Scheduled Job Coordinator:
```

## Architecture Questions
- What task requires a single active coordinator?
- How is leadership acquired and renewed?
- How is leader failure detected?
- How is split-brain prevented?
- What happens during leadership transition?
- Does the leader need persistent fencing tokens?

## When to Use
- Only one node should perform a task.
- Failover is required.
- A coordination system exists.

## When NOT to Use
- Multiple nodes can safely perform the work.
- The system cannot tolerate leadership gaps.
- Split-brain prevention is not designed.
