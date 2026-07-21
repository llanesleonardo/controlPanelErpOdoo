# Sharding

## Core Idea
Sharding partitions data across multiple shards, usually by key, so each shard owns part of the data.

## Problem It Solves
- A dataset or workload is too large for one database or node.

## Main Diagram
```text
Application -> Shard Router -> (Shard 1) -> (Shard 2) -> (Shard 3)
```

## 3 Concrete Examples
1. **User Sharding:** Users are assigned to shards by user ID.
2. **Tenant Sharding:** Each tenant or tenant group is stored on a shard.
3. **Geographic Sharding:** Data is partitioned by region.

## TypeScript Example
```typescript
const shards = [db0, db1, db2, db3];
function shard(key: string) { return shards[hash(key) % shards.length]; }
const customerId = 'customer-42';
shard(customerId).query('SELECT * FROM orders WHERE customer_id=$1', [customerId]);
// each shard owns a slice of keys — scale writes horizontally
const db = shard(customerId);
```

## Architecture Questions
- What shard key distributes data evenly?
- How are hot shards avoided?
- How are cross-shard queries handled?
- How is resharding performed?
- How are transactions handled across shards?
- How will routing know which shard owns data?

## When to Use
- One database cannot handle data size or throughput.
- A good partition key exists.
- Cross-shard operations are limited.

## When NOT to Use
- A single database can still scale.
- Queries require frequent joins across all data.
- The shard key would create hotspots.
