# Database Sharding

## Core Idea
Database Sharding splits data across multiple database shards using a shard key.

## Problem It Solves
- One database cannot handle the data size, throughput, or tenant volume.

## Main Diagram
```text
Application -> Shard Router -> (Shard 1) -> (Shard 2) -> (Shard 3)
```

## 3 Concrete Examples
1. **Customer ID Sharding:** Customers are distributed by customer ID across shards.
2. **Tenant Sharding:** Tenant groups are assigned to different shards.
3. **Region Sharding:** Data is split by geographic region.

## TypeScript Example
```typescript
function shardFor(tenantId: string) {
  const idx = hash(tenantId) % SHARDS.length;
  return SHARDS[idx];
}
async function query(tenantId: string, sql: string) { return shardFor(tenantId).query(sql); }
// Customer ID Sharding:
```

## Architecture Questions
- What is the shard key?
- Does the key distribute data evenly?
- How are cross-shard queries handled?
- How is resharding done?
- How are transactions across shards avoided?
- How is shard routing implemented?

## When to Use
- One database cannot handle scale.
- A good shard key exists.
- Cross-shard operations are limited.

## When NOT to Use
- A single database can still scale.
- Cross-shard joins are common.
- Shard key would create hotspots.
