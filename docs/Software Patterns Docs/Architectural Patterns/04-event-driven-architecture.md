# Event-Driven Architecture

## Core Idea
Event-Driven Architecture uses events to notify parts of the system that something happened, allowing producers and consumers to be decoupled.

## Problem It Solves
- Multiple parts of a system need to react to business changes without the original action directly calling every dependent process.

## Main Diagram
```text
Order Service -> Event Bus -> Email Consumer -> Inventory Consumer -> Analytics Consumer
```

## 3 Concrete Examples
1. OrderPlaced triggers email, inventory, analytics
2. UserRegistered triggers onboarding
3. PaymentFailed triggers retry workflow

## TypeScript Example
```typescript
eventBus.on('OrderPlaced', async (e) => await inventory.reserve(e.items));
eventBus.on('OrderPlaced', async (e) => await shipping.schedule(e.address));
eventBus.emit('OrderPlaced', { orderId: 'O-1', items: ['cell-pack'], address: 'Lab A' });
// Event-Driven Architecture
// subscribers handle the event independently
// Event-Driven Architecture uses events to notify parts of the system t...
```

## Architecture Questions
- What business events matter?
- Who publishes each event?
- Who consumes each event?
- Do consumers need immediate consistency or eventual consistency?
- How will failed event handling be retried?
- How will event schemas be versioned?

## When to Use
- Many independent reactions happen after a business action.
- Loose coupling is more important than immediate consistency.
- You need scalable asynchronous processing.
- Auditability and event history are useful.

## When NOT to Use
- The workflow requires immediate synchronous answers.
- The team cannot manage retries, duplicates, ordering, and observability.
- Events are used to hide unclear business workflow.
