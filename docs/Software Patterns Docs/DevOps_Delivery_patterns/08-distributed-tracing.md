# Distributed Tracing

## Core Idea
Distributed Tracing follows a request across services using trace and span IDs.

## Problem It Solves
- In distributed systems, a user request crosses many services and failures are hard to locate from local logs alone.

## Main Diagram
```text
Client
  |
Distributed Tracing
  |
Implementation
```

## 3 Concrete Examples
1. **Checkout Trace:** A checkout request is traced through cart, inventory, payment, shipping, and notification services.
2. **Latency Root Cause:** A trace shows most time spent waiting on a slow database call.
3. **Error Path Debugging:** A failed request trace identifies which service returned an error.

## TypeScript Example
```typescript
const parent = trace.getActiveSpan();
const child = tracer.startSpan('inventory.check', { parent });
child.setAttribute('sku', sku);
await inventory.check(sku);
child.end();
// Checkout Trace:
```

## Architecture Questions
- Where is the trace started?
- How are trace IDs propagated?
- Which operations create spans?
- What sampling rate is appropriate?
- How are errors recorded on spans?
- How are traces linked to logs and metrics?

## When to Use
- Requests cross service boundaries.
- Latency and error root cause are hard to find.
- Trace context can be propagated.

## When NOT to Use
- The system is not distributed.
- Trace propagation cannot be implemented.
- Sampling or storage costs make traces unusable.
