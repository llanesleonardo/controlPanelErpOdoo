# Throttling

## Core Idea
Throttling controls request throughput by delaying, shaping, or rejecting work when the system is under pressure.

## Problem It Solves
- A system needs to slow down request processing to protect resources or maintain stability.

## Main Diagram
```text
Incoming Requests -> Throttler -> Controlled Queue -> Service
```

## 3 Concrete Examples
1. **Background Job Throttling:** A worker processes only 100 jobs per second.
2. **Upload Throttling:** Large file uploads are slowed during peak traffic.
3. **Downstream Protection:** A service limits calls to a slow dependency.

## TypeScript Example
```typescript
let inFlight = 0;
async function throttled<T>(fn: () => Promise<T>) {
  while (inFlight >= MAX) await sleep(10);
  inFlight++; try { return await fn(); } finally { inFlight--; }
}
// Background Job Throttling:
```

## Architecture Questions
- Should requests be delayed or rejected?
- What resource is being protected?
- Is throttling static or adaptive?
- Who gets priority when capacity is low?
- How is backpressure communicated?
- How is user experience affected?

## When to Use
- You need controlled throughput.
- Downstream systems need protection.
- Delaying work is acceptable.

## When NOT to Use
- Requests must be processed immediately.
- Queues could grow without bound.
- Rejecting with rate limits would be clearer.
