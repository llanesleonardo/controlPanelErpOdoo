# Cache-Aside

## Core Idea
Cache-Aside lets the application check the cache first, load from the database on a miss, then store the result in cache.

## Problem It Solves
- Repeated reads hit the database even when the same data could be reused from a cache.

## Main Diagram
```text
Application -> (Cache) -> (Database)
```

## 3 Concrete Examples
1. **Product Detail Cache:** Product pages load product data from cache or fallback to DB.
2. **User Profile Cache:** Profile lookups are cached with TTL.
3. **Configuration Cache:** Application settings are cached and refreshed on miss or expiry.

## TypeScript Example
```typescript
async function getProduct(id: string) {
  const cached = await cache.get(id);
  if (cached) return cached;
  const product = await db.products.find(id);
  await cache.set(id, product, 300);
  return product;
}
```

## Architecture Questions
- What data is safe to cache?
- What TTL should be used?
- How is cache invalidated?
- Can stale data be tolerated?
- What happens when cache is down?
- How is cache stampede prevented?

## When to Use
- Repeated reads are expensive.
- Stale data is acceptable within limits.
- Application-controlled caching is practical.

## When NOT to Use
- Data changes constantly and must be fresh.
- Invalidation rules are unclear.
- Cache failure would break core behavior.
