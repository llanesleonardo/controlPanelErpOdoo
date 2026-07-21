# Outbox

## Core Idea
The Outbox Pattern writes the business change and outgoing message into the same database transaction. A separate publisher later sends the message.

## Problem It Solves
- A service must update its database and publish a message, but doing those two actions separately can create inconsistent state.

## Main Diagram
```text
Service -> (Service Database) -> (Outbox Table) -> Outbox Publisher -> Message Broker
```

## 3 Concrete Examples
1. **OrderCreated Event:** Order service saves order and writes OrderCreated into an outbox table in one transaction.
2. **PaymentCompleted Event:** Payment service records payment and queues event for publishing.
3. **UserRegistered Email Event:** User service writes user and outbox event atomically.

## TypeScript Example
```typescript
async function createOrder(o: Order) {
  await db.transaction(async tx => {
    await tx.insert('orders', o);
    await tx.insert('outbox', { type: 'OrderCreated', payload: o });
  });
}
// Relay publishes outbox rows to message bus
```

## Architecture Questions
- What business change requires an outgoing event?
- Can the event be stored in the same transaction?
- Who publishes outbox records?
- How are duplicates handled?
- When are outbox records marked published?
- How is ordering handled?

## When to Use
- Database updates and event publishing must stay consistent.
- At-least-once publishing is acceptable.
- Consumers can handle duplicate messages.

## When NOT to Use
- No outgoing messages are needed.
- You require exactly-once end-to-end behavior without duplicate handling.
- A simpler synchronous call is sufficient.
