# Request Hedging

## Core Idea
Request Hedging sends a duplicate request after a short delay and uses the first successful response, reducing tail latency at the cost of extra load.

## Problem It Solves
- Long-tail latency can hurt user experience even when most requests are fast.

## Main Diagram
```text
Client
  |
Request Hedging
  |
Implementation
```

## 3 Concrete Examples
1. **Search Query Hedging:** A search request is duplicated to another replica if the first replica is slow.
2. **Read-Only Profile Lookup:** A duplicate read goes to another region after a delay.
3. **Recommendation Service:** Slow recommendation calls are hedged to another instance.

## TypeScript Example
```typescript
async function hedgedFetch(url: string) {
  const primary = fetch(url);
  const backup = sleep(200).then(() => fetch(url));
  return Promise.race([primary, backup]);
}
// Search Query Hedging:
```

## Architecture Questions
- Is the operation safe to duplicate?
- What delay triggers the hedge?
- How much extra load is acceptable?
- Which response wins?
- How are duplicate side effects prevented?
- Does hedging make overload worse?

## When to Use
- Tail latency matters.
- Requests are read-only or safely idempotent.
- Replicas are independent enough that a second request may be faster.

## When NOT to Use
- Operations have side effects.
- The system is already overloaded.
- Extra duplicate traffic is unacceptable.
