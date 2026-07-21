# Saga

## Core Idea
Saga breaks a distributed transaction into a sequence of local transactions with compensating actions for failure.

## Problem It Solves
- A business transaction spans multiple services or databases where a single ACID transaction is not practical.

## Main Diagram
```text
Start Saga -> Reserve Inventory -> Authorize Payment -> Create Shipment -> Complete
```

## 3 Concrete Examples
1. **Order Checkout:** Reserve inventory, charge payment, create shipment; compensate if payment fails.
2. **Travel Booking:** Book flight, hotel, and car; cancel prior reservations if a later step fails.
3. **Account Opening:** Create customer, run compliance checks, open account; roll back with compensating steps.

## TypeScript Example
```typescript
async function orderSaga(order: Order) {
  try { await payment.charge(order); await inventory.reserve(order); await shipping.book(order); }
  catch { await payment.refund(order); await inventory.release(order); }
}
// Order Checkout:
await orderSaga();
```

## Architecture Questions
- What are the local transaction steps?
- What compensation exists for each completed step?
- Is orchestration or choreography better?
- What failures can happen at each step?
- Can the system tolerate eventual consistency?
- How are retries and idempotency handled?

## When to Use
- A transaction spans services.
- Compensation is possible.
- Eventual consistency is acceptable.
- You need business-level rollback behavior.

## When NOT to Use
- A single local transaction is enough.
- Compensation is impossible or legally invalid.
- The workflow requires strict immediate atomicity.
