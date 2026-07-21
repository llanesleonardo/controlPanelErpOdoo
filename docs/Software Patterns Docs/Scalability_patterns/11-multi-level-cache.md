# Multi-Level Cache

## Core Idea
Multi-Level Cache uses multiple cache layers, often from fastest/local to slower/shared, before reaching the source of truth.

## Problem It Solves
- One cache layer is not enough to balance speed, cost, consistency, and shared availability.

## Main Diagram
```text
Request -> L1 Local Cache -> L2 Distributed Cache -> L3 CDN / Edge Cache -> (Source of Truth)
```

## 3 Concrete Examples
1. **Browser-CDN-Origin Cache:** Browser cache, CDN cache, and origin cache reduce repeated asset requests.
2. **In-Memory plus Redis:** A service checks local memory first, then Redis, then database.
3. **CPU/Memory Style Application Cache:** Hot values sit in process memory while broader shared values live in distributed cache.

## TypeScript Example
```typescript
async function get(key: string) {
  return l1.get(key) ?? (await l2.get(key)) ?? (await db.fetch(key));
}
```

## Architecture Questions
- What cache layers exist?
- What data belongs in each layer?
- How are TTLs coordinated?
- How is invalidation propagated?
- How are stale values detected?
- What is the fallback path on cache miss?

## When to Use
- Different cache layers provide different latency/cost tradeoffs.
- Hot data benefits from local caching.
- A miss chain can be designed clearly.

## When NOT to Use
- One simple cache layer is enough.
- Invalidation across layers cannot be managed.
- Stale data risks are unacceptable.
