# Message Store

## Core Idea
A Message Store persists messages for auditing, replay, debugging, or recovery.

## Problem It Solves
- Messages passing through the system need to be retained instead of disappearing after delivery.

## Main Diagram
```text
Producer -> Message Channel -> (Message Store) -> Consumer
```

## 3 Concrete Examples
1. **Audit Trail:** Every payment event is stored for compliance.
2. **Replay Support:** Events are stored so projections can be rebuilt.
3. **Debugging Integration Failures:** Inbound and outbound messages are stored for diagnosis.

## TypeScript Example
```typescript
await messageStore.append('orders', { type: 'OrderCreated', orderId: '42' });
const history = await messageStore.read('orders', { from: offset });
```

## Architecture Questions
- Which messages need to be stored?
- Is the store for audit, replay, or debugging?
- How long are messages retained?
- Can sensitive data be stored?
- How are stored messages searched?
- Can messages be replayed safely?

## When to Use
- Messages need audit, replay, or debugging.
- Retention and search are required.
- Stored messages can be secured properly.

## When NOT to Use
- Message retention creates privacy or compliance risk.
- Messages are huge and storage is unjustified.
- No one needs audit or replay.
