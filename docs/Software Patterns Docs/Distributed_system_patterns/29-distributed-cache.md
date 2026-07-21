# Distributed Cache

## Core Idea
A Distributed Cache stores frequently accessed data across a cache cluster so multiple application instances can reuse it.

## Problem It Solves
- Repeated reads or expensive computations overload databases or services.

## Main Diagram
```text
App Instance 1 -> App Instance 2 -> (Distributed Cache) -> (Database)
```

## 3 Concrete Examples
1. **Session Cache:** User sessions are stored in Redis for many app instances.
2. **Product Catalog Cache:** Hot product data is cached to reduce database load.
3. **Computed Result Cache:** Expensive report summaries are cached across workers.

## TypeScript Example
```typescript
const cache = new RedisCluster(['node-a', 'node-b', 'node-c']);
await cache.set('session:abc', sessionData, 'EX', 3600);
const hit = await cache.get('session:abc');
```

## Architecture Questions
- What data should be cached?
- What is the TTL?
- How is cache invalidation handled?
- Can stale data be tolerated?
- What happens if the cache is down?
- Does caching introduce consistency bugs?

## When to Use
- Repeated reads are expensive.
- Stale data is acceptable within limits.
- Multiple app instances need shared cached data.

## When NOT to Use
- Data changes constantly and must always be fresh.
- Invalidation rules are unclear.
- The cache would become the source of truth accidentally.
