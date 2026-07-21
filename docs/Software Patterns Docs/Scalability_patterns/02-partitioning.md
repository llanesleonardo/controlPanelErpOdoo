# Partitioning

## Core Idea
Partitioning divides data, traffic, or workload into smaller independent segments.

## Problem It Solves
- One large dataset, queue, or workload becomes too large, slow, or contentious to manage as a single unit.

## Main Diagram
```text
Workload / Dataset -> Partitioner -> Partition A -> Partition B -> Partition C
```

## 3 Concrete Examples
1. **Customer Partitioning:** Customers are partitioned by customer ID range so queries and processing operate on smaller groups.
2. **Queue Partitioning:** Events are partitioned by account ID so processing can scale while preserving order per account.
3. **Regional Partitioning:** Data and traffic are partitioned by geography to reduce latency and isolate workloads.

## TypeScript Example
```typescript
const partitions = { east: dbEast, west: dbWest };
function partitionFor(customerId: string) {
  return customerId.startsWith('E') ? partitions.east : partitions.west;
}
await partitionFor('E-1001').orders.insert({ id: 'O-1', total: 99 });
```

## Architecture Questions
- What is being partitioned: data, traffic, tenants, queues, or compute?
- What partition key gives even distribution?
- Does ordering need to be preserved within a partition?
- How are hot partitions detected?
- Can partitions be moved or rebalanced?
- What operations need to cross partitions?

## When to Use
- The workload or dataset is too large as one unit.
- A useful partition key exists.
- Operations mostly stay within partitions.

## When NOT to Use
- No stable partition key exists.
- Most operations need global coordination.
- Hot partitions would dominate traffic.
