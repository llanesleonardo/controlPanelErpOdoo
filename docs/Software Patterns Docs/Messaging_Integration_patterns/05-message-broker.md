# Message Broker

## Core Idea
A Message Broker receives messages from producers, routes them, stores them when needed, and delivers them to consumers.

## Problem It Solves
- Applications need reliable asynchronous communication without directly connecting every producer to every consumer.

## Main Diagram
```text
Producer A -> Producer B -> Message Broker -> Queue / Topic A -> Queue / Topic B
```

## 3 Concrete Examples
1. **Enterprise Integration:** A broker routes order, payment, and shipment messages between systems.
2. **Microservice Messaging:** Services publish commands and events through a broker like RabbitMQ or ActiveMQ.
3. **Legacy System Bridge:** A broker buffers messages between a modern API and a slow legacy system.

## TypeScript Example
```typescript
await broker.connect();
await broker.publish('orders', Buffer.from(JSON.stringify({ orderId: '42' })));
await broker.consume('orders', async (msg) => { await handleOrder(msg); broker.ack(msg); });
```

## Architecture Questions
- What routing patterns are needed?
- Are messages durable?
- How are queues and topics organized?
- What delivery guarantees are required?
- How are retries and dead letters handled?
- Can the broker become a bottleneck?

## When to Use
- Many applications need mediated messaging.
- Durable delivery, routing, and retries are needed.
- Direct point-to-point integrations are becoming messy.

## When NOT to Use
- The system is small and direct calls are enough.
- Broker operations are not supported.
- The broker would centralize too much business logic.
