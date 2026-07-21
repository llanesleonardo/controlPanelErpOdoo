# CQRS Read Model

## Core Idea
CQRS Read Model is a read-optimized model built separately from the write model.

## Problem It Solves
- The write model is good for enforcing rules but bad for fast, convenient, or complex queries.

## Main Diagram
```text
Write Model -> Events / Change Feed -> Read Model Projector -> (CQRS Read Model) -> Query API
```

## 3 Concrete Examples
1. **Order Dashboard:** A read model stores order status, customer name, total, and shipment status in one view.
2. **Account Statement:** A read projection stores transaction history optimized for display.
3. **Product Search View:** A denormalized read model supports search filters and sorting.

## TypeScript Example
```typescript
eventBus.on('OrderCreated', (e) => readModel.orders.upsert({ id: e.id, summary: e.summary }));
const view = await readModel.orders.get('O-42');
```

## Architecture Questions
- What query needs a separate model?
- How is the read model updated?
- Can reads be eventually consistent?
- How is rebuild handled?
- Who owns projection logic?
- How are stale read models detected?

## When to Use
- Read needs differ from write model needs.
- Denormalized projections improve query performance.
- Eventual consistency is acceptable.

## When NOT to Use
- Simple CRUD queries are enough.
- Eventual consistency is unacceptable.
- Projection rebuilds are not designed.
