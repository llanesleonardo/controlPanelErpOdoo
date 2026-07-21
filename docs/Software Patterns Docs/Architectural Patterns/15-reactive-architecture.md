# Reactive Architecture

## Core Idea
Reactive Architecture designs systems to be responsive, resilient, elastic, and message-driven.

## Problem It Solves
- A system must remain responsive under load, recover from failures, and handle asynchronous data flows.

## Main Diagram
```text
Client -> Reactive API -> Message Stream -> Reactive Component A -> Reactive Component B
```

## 3 Concrete Examples
1. Real-time dashboards
2. Streaming systems
3. Highly concurrent user systems

## TypeScript Example
```typescript
const alerts$ = sensorReadings$.pipe(
  filter(r => r.voltage > 2.5),
  map(r => ({ ...r, alert: r.tempC > 60 })),
);
alerts$.subscribe(reading => alertBus.publish(reading));
```

## Architecture Questions
- What events or messages drive the system?
- How does the system remain responsive under load?
- How are failures isolated?
- Can components scale elastically?
- How is backpressure handled?
- Is asynchronous processing acceptable?

## When to Use
- The system needs high responsiveness.
- The workload is asynchronous or streaming.
- Resilience and elasticity are important.
- Backpressure and non-blocking behavior matter.

## When NOT to Use
- The system is simple request/response CRUD.
- The team is not ready for async complexity.
- Strong linear workflows are easier and sufficient.
