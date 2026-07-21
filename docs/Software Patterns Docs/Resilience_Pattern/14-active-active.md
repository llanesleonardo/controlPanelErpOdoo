# Active-Active

## Core Idea
Active-Active runs multiple instances, zones, or regions serving traffic at the same time.

## Problem It Solves
- The system needs high availability, load sharing, and reduced dependence on one active site.

## Main Diagram
```text
Users -> Global Router -> Active Site A -> Active Site B -> (Data A)
```

## 3 Concrete Examples
1. **Multi-Region Active-Active API:** Users are routed to the nearest healthy region, and both regions serve live traffic.
2. **Active-Active Load Balanced Service:** All replicas serve requests behind a load balancer.
3. **Multi-Primary Cache:** Multiple cache nodes accept traffic and replicate or partition data.

## TypeScript Example
```typescript
const nodes = ['dc-a', 'dc-b'];
async function write(key: string, value: string) {
  await Promise.all(nodes.map(n => replicas[n].put(key, value)));
}
// Multi-Region Active-Active API:
await write();
```

## Architecture Questions
- How is traffic distributed?
- How is data synchronized or partitioned?
- Can the system handle conflicts?
- What happens under network partition?
- How is user/session affinity handled?
- How is global health monitored?

## When to Use
- High availability and load sharing are required.
- Data conflicts can be handled.
- Multiple sites can safely serve traffic.

## When NOT to Use
- Conflict resolution is not designed.
- Data consistency requirements are strict and immediate.
- Operational complexity is not justified.
