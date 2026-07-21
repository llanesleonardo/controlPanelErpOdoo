# CDN

## Core Idea
A CDN caches and serves content from edge locations close to users.

## Problem It Solves
- Serving static or cacheable content from origin servers creates latency, bandwidth cost, and origin load.

## Main Diagram
```text
User -> CDN Edge -> Origin Server -> (Origin Storage)
```

## 3 Concrete Examples
1. **Static Asset Delivery:** Images, CSS, and JavaScript are served from edge caches.
2. **Video Streaming:** Video segments are cached near viewers.
3. **API Edge Caching:** Cacheable API responses are served from CDN edge nodes.

## TypeScript Example
```typescript
app.get('/static/*', (req, res) => {
  res.set('Cache-Control', 'public, max-age=31536000');
  res.sendFile(path.join(cdnOrigin, req.path));
});
// Static Asset Delivery:
app.listen(3000);
```

## Architecture Questions
- What content is cacheable?
- What TTL and cache keys should be used?
- How is invalidation handled?
- Does content vary by user, region, or language?
- What should bypass the CDN?
- How is origin protected?

## When to Use
- Content is static or cacheable.
- Origin load or global latency is a problem.
- Edge caching improves user experience.

## When NOT to Use
- Content is highly personalized and non-cacheable.
- Invalidation requirements are too strict.
- Edge caching could leak private data.
