# CQRS

## Core Idea
CQRS separates commands that change state from queries that read state.

## Problem It Solves
- One model struggles to support both complex writes and high-performance reads.

## Main Diagram
```text
Client -> Command API -> Query API -> Write Model -> Read Model
```

## 3 Concrete Examples
1. **Order System:** Commands create and update orders, while read models serve order dashboards.
2. **Banking Ledger:** Write side enforces transaction rules, read side serves statements and summaries.
3. **Product Catalog:** Write side manages product lifecycle, read side supports fast filtering and search.

## TypeScript Example
```typescript
await commandBus.send(new PlaceOrder({ customerId: 'C-1', total: 99 }));
const summary = await queryBus.ask(new GetOrderSummary('O-42'));
```

## Architecture Questions
- Are read and write needs different enough to justify separation?
- What commands change state?
- What read models are needed?
- Can reads be eventually consistent?
- How are read models updated?
- How are failures in projection handled?

## When to Use
- Read and write models have different needs.
- Read performance or query shape requires a separate model.
- Eventual consistency is acceptable.

## When NOT to Use
- Simple CRUD is enough.
- Immediate consistency is required for reads.
- Projection complexity is not justified.
