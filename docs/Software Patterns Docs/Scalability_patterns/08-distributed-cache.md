# Distributed Cache

## Core Idea
Distributed Cache stores frequently used data in a shared cache cluster accessible by multiple service instances.

## Problem It Solves
- Repeated expensive reads or computations overload databases and downstream services.

## Main Diagram
```text
App Instance A -> App Instance B -> (Distributed Cache) -> (Database)
```

## 3 Concrete Examples
1. **Session Cache:** User sessions are stored in Redis so many app instances can access them.
2. **Product Data Cache:** Hot product details are cached to reduce database reads.
3. **Computed Summary Cache:** Expensive dashboard summaries are cached for fast repeated access.

## TypeScript Example
```typescript
let product = await memcached.get('product:42');
if (!product) { product = await db.products.load('42'); await memcached.set('product:42', product, 600); }
```

## Architecture Questions
- What data should be cached?
- How stale can the data be?
- What TTL should be used?
- How is invalidation handled?
- What happens if the cache is unavailable?
- How do we prevent cache stampedes?

## When to Use
- Repeated reads or computations are expensive.
- Shared cache access is needed across instances.
- Stale data can be tolerated within limits.

## When NOT to Use
- Data changes constantly and must be fresh.
- Invalidation rules are unclear.
- The cache could accidentally become the source of truth.
