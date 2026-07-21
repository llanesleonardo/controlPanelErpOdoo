# Backpressure

## Core Idea
Backpressure signals upstream producers to slow down when downstream consumers cannot keep up.

## Problem It Solves
- Fast producers can overwhelm slower consumers, causing queues, memory, latency, and failures to grow uncontrollably.

## Main Diagram
```text
Producer -> Bounded Queue -> Consumer -> Backpressure Signal
```

## 3 Concrete Examples
1. **Streaming Pipeline:** A slow consumer requests fewer messages until it catches up.
2. **HTTP 429 Response:** An API tells clients to slow down when capacity is constrained.
3. **Bounded Queue Blocking:** Producers block or slow when a worker queue reaches capacity.

## TypeScript Example
```typescript
async function* produce() { while (true) yield await readSensor(); }
for await (const reading of produce()) {
  if (!consumer.ready) await sleep(10); // slow producer when consumer lags
  await consumer.send(reading);
}
// Streaming Pipeline:
```

## Architecture Questions
- Where does overload appear first?
- How is pressure signaled upstream?
- Do producers slow down, block, buffer, or drop?
- What queue limits are enforced?
- How is pressure monitored?
- What happens if producers ignore the signal?

## When to Use
- Producers can overwhelm consumers.
- Upstream can slow down or stop producing.
- Queue growth must be controlled.

## When NOT to Use
- Producers cannot slow down.
- The protocol cannot signal pressure.
- The system just buffers endlessly anyway.
