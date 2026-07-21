# CDN

## Core Idea
A CDN caches and serves content from edge locations near users.

## Problem It Solves
- Serving content from the origin for every request increases latency, bandwidth cost, and origin load.

## Main Diagram
```text
User -> CDN Edge Cache -> Origin Server -> (Origin Storage)
```

## 3 Concrete Examples
1. **Static Asset Delivery:** Images, CSS, JavaScript, and fonts are cached at edge locations.
2. **Video Streaming:** Video segments are cached near viewers to reduce buffering.
3. **Cacheable API Responses:** Public catalog or documentation API responses are cached at the CDN edge.

## TypeScript Example
```typescript
const assetUrl = (file: string) => `https://cdn.example.com/assets/${hash(file)}.js`;
res.set('CDN-Cache-Control', 'max-age=86400');
res.redirect(302, assetUrl('bundle.js'));
```

## Architecture Questions
- What content is cacheable?
- What TTL should be used?
- What should the cache key include?
- How are stale objects invalidated?
- Does content vary by user, region, or language?
- How is private data kept out of the CDN cache?

## When to Use
- Content is cacheable.
- Global latency or origin load is a problem.
- Cache invalidation can be controlled.

## When NOT to Use
- Content is highly personalized or sensitive.
- Cache invalidation must be immediate and exact.
- Caching could leak private data.
