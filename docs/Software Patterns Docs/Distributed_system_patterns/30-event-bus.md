# Event Bus

## Core Idea
An Event Bus carries events from producers to interested consumers.

## Problem It Solves
- Multiple components need to publish and subscribe to events without direct coupling.

## Main Diagram
```text
Producer -> Event Bus -> Consumer A -> Consumer B -> Consumer C
```

## 3 Concrete Examples
1. **OrderPlaced Bus:** Order service publishes and notification, inventory, analytics consumers react.
2. **Frontend Event Bus:** UI components react to application-level events.
3. **Internal Modular Monolith Bus:** Modules publish domain events inside one app.

## TypeScript Example
```typescript
const bus = new EventBus('orders');
bus.subscribe('OrderPlaced', inventory.onOrder);
bus.publish('OrderPlaced', { orderId: '42' });
```

## Architecture Questions
- What events are published?
- Who owns event schemas?
- Which consumers subscribe?
- Is delivery synchronous or asynchronous?
- Are events durable?
- How are retries and dead letters handled?

## When to Use
- Multiple consumers react to the same event.
- Producers should not know consumers.
- Loose coupling and extensibility matter.

## When NOT to Use
- A direct call is clearer.
- Event flow would hide important business workflow.
- No one owns event schemas or reliability.
