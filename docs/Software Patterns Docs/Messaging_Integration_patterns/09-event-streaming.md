# Event Streaming

## Core Idea
Event Streaming stores ordered streams of events that consumers can read, replay, and process independently.

## Problem It Solves
- Systems need durable event history, scalable consumption, replay, and real-time processing.

## Main Diagram
```text
Producer -> Event Stream / Log -> Consumer Group A -> Consumer Group B -> Consumer Group C
```

## 3 Concrete Examples
1. **Clickstream Analytics:** User clicks are streamed to analytics and personalization consumers.
2. **Order Event Log:** Order lifecycle events are stored and replayed for projections.
3. **IoT Telemetry:** Device readings stream continuously into processing and storage.

## TypeScript Example
```typescript
const stream = kafka.consumer('telemetry');
for await (const event of stream) {
  await projector.apply(event);
}
// Clickstream Analytics:
// Event Streaming stores ordered streams of events that consumers can r...
```

## Architecture Questions
- What events belong in the stream?
- What partition key preserves needed ordering?
- How long are events retained?
- Do consumers need replay?
- How are schemas versioned?
- How is consumer lag monitored?

## When to Use
- Durable event history and replay are needed.
- Consumers process events independently.
- High-throughput ordered event logs are useful.

## When NOT to Use
- Only current state matters.
- Replay is not needed.
- Operational complexity is not justified.
