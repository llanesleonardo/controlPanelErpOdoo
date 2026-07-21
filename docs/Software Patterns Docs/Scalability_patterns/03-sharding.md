# Sharding

## Core Idea
Sharding splits a database or data store across multiple shards using a shard key.

## Problem It Solves
- A single database cannot handle data size, throughput, or tenant volume.

## Main Diagram
```text
Application -> Shard Router -> (Shard 1) -> (Shard 2) -> (Shard 3)
```

## 3 Concrete Examples
1. **User ID Sharding:** Users are assigned to database shards based on user ID hash.
2. **Tenant Sharding:** SaaS tenants are distributed across shards, with large tenants placed on dedicated shards.
3. **Geographic Sharding:** EU data lives on EU shards and US data lives on US shards.

## TypeScript Example
```typescript
const shards = [db0, db1, db2];
const shard = (userId: string) => shards[parseInt(userId.slice(-2), 16) % shards.length];
await shard('user-7f3a').insert('events', { type: 'page_view' });
```

## Architecture Questions
- What shard key distributes data evenly?
- How will the application route to the correct shard?
- How are hot shards avoided?
- How are cross-shard queries handled?
- How will resharding happen?
- Can transactions stay within one shard?

## When to Use
- One database cannot handle scale.
- Data can be routed by shard key.
- Cross-shard operations are rare or manageable.

## When NOT to Use
- A single database can still scale.
- Frequent cross-shard joins or transactions are required.
- Resharding and routing are not designed.
