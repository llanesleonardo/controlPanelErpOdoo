# Publish-Subscribe

## Core Idea
Publish-Subscribe lets one producer publish a message to a topic while multiple independent subscribers receive copies of that message.

## Problem It Solves
- A producer needs to notify multiple consumers without knowing who they are or how many exist.

## Main Diagram
```text
Publisher -> Topic -> Subscriber A -> Subscriber B -> Subscriber C
```

## 3 Concrete Examples
1. **Order Events:** An order service publishes OrderPlaced and email, inventory, analytics, and audit subscribers all react independently.
2. **User Registration:** A user service publishes UserRegistered and onboarding, CRM, and notification systems subscribe.
3. **IoT Sensor Updates:** A sensor publishes temperature readings and dashboards, alerting, and storage consumers receive the same readings.

## TypeScript Example
```typescript
const bus = new EventEmitter();
bus.on('order.placed', notifyWarehouse);
bus.on('order.placed', sendReceiptEmail);
bus.emit('order.placed', { orderId: '99' });
// Order Events:
// subscribers handle the event independently
```

## Architecture Questions
- What topic or event type should be published?
- Who owns the event schema?
- Do all subscribers need every message?
- Is delivery durable or best-effort?
- Can subscribers process messages independently?
- How are retries and failed subscribers handled?

## When to Use
- One event should notify many independent consumers.
- The producer should not know subscribers.
- Adding new consumers should not require producer changes.

## When NOT to Use
- Only one known consumer exists and direct communication is simpler.
- Subscribers require strict synchronous response.
- Event contracts are not owned.
