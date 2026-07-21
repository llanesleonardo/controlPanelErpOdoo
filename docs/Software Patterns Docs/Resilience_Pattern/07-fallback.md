# Fallback

## Core Idea
Fallback provides an alternative response or path when the primary operation fails.

## Problem It Solves
- A failed dependency or operation needs a safe substitute instead of returning a raw failure.

## Main Diagram
```text
Call Primary -> Primary Result -> Fallback Path -> Return Result
```

## 3 Concrete Examples
1. **Cached Response:** If the live catalog API fails, return recently cached product data.
2. **Default Recommendation:** If personalization fails, show popular products.
3. **Secondary Provider:** If the primary SMS provider fails, send through a backup provider.

## TypeScript Example
```typescript
async function getRate(pair: string) {
  try { return await primaryFx.get(pair); }
  catch { return await cache.get(pair) ?? defaultRate(pair); }
}
// Cached Response:
await getRate();
```

## Architecture Questions
- What primary failure triggers fallback?
- What fallback result is safe?
- Is fallback stale, approximate, or alternate?
- Should the user know fallback was used?
- How is fallback monitored?
- Can fallback become permanently relied on?

## When to Use
- A safe alternative response or path exists.
- Primary dependency failure should not fully break the experience.
- Fallback quality is acceptable.

## When NOT to Use
- Fallback data is unsafe or misleading.
- Fallback silently masks data corruption.
- No one monitors fallback usage.
