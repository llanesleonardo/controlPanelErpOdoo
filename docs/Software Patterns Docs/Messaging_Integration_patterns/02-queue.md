# Queue

## Core Idea
A Queue stores messages until consumers are ready to process them, usually delivering each message to one consumer.

## Problem It Solves
- A producer and consumer operate at different speeds or availability levels and need asynchronous decoupling.

## Main Diagram
```text
Producer -> Message Queue -> Consumer
```

## 3 Concrete Examples
1. **Email Queue:** A web app enqueues email jobs while background workers send them later.
2. **Image Processing:** Uploaded images are placed on a queue and workers resize them asynchronously.
3. **Order Fulfillment:** Order events are queued for warehouse processing so checkout is not blocked.

## TypeScript Example
```typescript
const queue = new Queue('jobs');
await queue.send({ type: 'export', userId: 'u1' });
const msg = await queue.receive();
await process(msg); await queue.ack(msg);
// Email Queue:
// A Queue stores messages until consumers are ready to process them, us...
```

## Architecture Questions
- What work should be asynchronous?
- How long can messages wait?
- What is the retry policy?
- What happens when processing fails?
- How many consumers can process the queue?
- Does message order matter?

## When to Use
- Producer and consumer speeds differ.
- Work should be processed asynchronously.
- Temporary consumer downtime should not lose work.

## When NOT to Use
- Immediate response is required.
- The system cannot tolerate eventual processing.
- Message ordering or duplication cannot be handled.
