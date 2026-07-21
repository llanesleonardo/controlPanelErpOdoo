# Database per Service

## Core Idea
Database per Service means each service owns its data store and other services access that data only through service APIs or events.

## Problem It Solves
- Microservices sharing one database become tightly coupled and cannot evolve independently.

## Main Diagram
```text
Order Service -> Payment Service -> Inventory Service -> (Order DB) -> (Payment DB)
```

## 3 Concrete Examples
1. **Order Service DB:** Only Order service writes order data.
2. **Payment Service DB:** Payment data is hidden behind payment APIs/events.
3. **Inventory Service DB:** Inventory owns stock records and publishes changes.

## TypeScript Example
```typescript
const ordersDb = connect('orders-db');
const billingDb = connect('billing-db');
// integrate via API/events — never cross-query the other service DB
```

## Architecture Questions
- Which service owns which data?
- How do other services get needed data?
- Can workflows tolerate eventual consistency?
- How are distributed transactions avoided?
- How are read models or projections built?
- How is reporting handled across services?

## When to Use
- Services need independent ownership and deployment.
- Data boundaries are clear.
- Eventual consistency and integration patterns are understood.

## When NOT to Use
- The system needs simple ACID transactions across all data.
- Service boundaries are unclear.
- The team is not ready for distributed data complexity.
