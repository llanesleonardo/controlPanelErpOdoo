# Correlation Identifier

## Core Idea
A Correlation Identifier is an ID included in related messages so they can be matched across asynchronous flows.

## Problem It Solves
- A system needs to know which response, event, or follow-up message belongs to which original request or workflow.

## Main Diagram
```text
Client
  |
Correlation Identifier
  |
Implementation
```

## 3 Concrete Examples
1. **Request-Reply:** A reply includes the request's correlation ID.
2. **Order Saga:** All messages in the order workflow share a saga correlation ID.
3. **Distributed Trace:** Events across services carry a trace or correlation ID for debugging.

## TypeScript Example
```typescript
const correlationId = crypto.randomUUID();
await bus.publish('Step1', { correlationId, orderId: '42' });
await bus.publish('Step2', { correlationId, orderId: '42' });
```

## Architecture Questions
- What ID links related messages?
- Who creates the correlation ID?
- Is it propagated through every message?
- Is it distinct from message ID?
- How is it logged?
- How is correlation used for aggregation or tracing?

## When to Use
- Messages belong to a larger workflow.
- Replies need to match requests.
- Tracing and aggregation need shared IDs.

## When NOT to Use
- There is no multi-message workflow.
- Messages already have adequate trace context.
- IDs are not propagated consistently.
