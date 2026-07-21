# Leaky Bucket

## Core Idea
Leaky Bucket queues incoming requests and releases them at a fixed rate. Excess requests overflow and are dropped or rejected.

## Problem It Solves
- Bursty traffic must be smoothed into a steady output rate.

## Main Diagram
```text
Bursty Input -> Queue / Bucket -> Steady Output Rate -> Overflow Drop / Reject
```

## 3 Concrete Examples
1. **Smooth API Calls to Downstream:** Requests are drained toward a legacy API at a steady rate.
2. **Network Traffic Shaping:** Bursty packets are smoothed to a stable output rate.
3. **Job Dispatch Control:** Jobs are accepted quickly but processed at a controlled rate.

## TypeScript Example
```typescript
class LeakyBucket {
  private queue: Request[] = [];
  tick() { const req = this.queue.shift(); if (req) process(req); }
  enqueue(req: Request) { if (this.queue.length < 100) this.queue.push(req); }
}
// Smooth API Calls to Downstream:
```

## Architecture Questions
- What output rate is safe?
- How large can the queue be?
- What happens when the bucket overflows?
- Is latency from queueing acceptable?
- Which requests get priority?
- Do callers receive backpressure?

## When to Use
- You need steady output.
- Downstream cannot handle bursts.
- Queueing delay is acceptable.

## When NOT to Use
- Bursts should be allowed.
- Low latency is more important than smoothing.
- Queues could grow and hide overload.
