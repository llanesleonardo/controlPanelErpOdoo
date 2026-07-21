# Competing Consumers

## Core Idea
Competing Consumers use multiple consumers reading from the same queue so work can be processed in parallel.

## Problem It Solves
- A single consumer cannot process messages fast enough or needs failover support.

## Main Diagram
```text
Producer -> Work Queue -> Consumer 1 -> Consumer 2 -> Consumer 3
```

## 3 Concrete Examples
1. **Email Workers:** Several workers consume from the same email queue.
2. **Image Resizing Fleet:** Multiple workers process image resize jobs in parallel.
3. **Order Fulfillment Workers:** Warehouse tasks are distributed among multiple consumers.

## TypeScript Example
```typescript
const consumers = Array.from({ length: 4 }, () => worker(async () => {
  const msg = await queue.pop();
  if (msg) await handle(msg);
}));
// Email Workers:
// Competing Consumers use multiple consumers reading from the same queu...
```

## Architecture Questions
- Can messages be processed independently?
- Does processing order matter?
- How many consumers are needed?
- Can duplicate processing happen?
- How are failures retried?
- Is the consumer logic idempotent?

## When to Use
- Queue throughput must scale.
- Messages can be processed independently.
- Consumer failover is useful.

## When NOT to Use
- Strict global ordering is required.
- Processing is not idempotent.
- Consumers fight over shared state.
