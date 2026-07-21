# Event-Carried State Transfer

## Core Idea
Event-Carried State Transfer includes enough state in the event so consumers do not need to query the producer for details.

## Problem It Solves
- Consumers need data to update local views or react independently, and repeated lookups to the source would create coupling or load.

## Main Diagram
```text
Producer -> Event with State -> Consumer A Local View -> Consumer B Local View
```

## 3 Concrete Examples
1. **CustomerUpdated Event:** The event includes customer name, email, and status so CRM projections update locally.
2. **ProductPriceChanged:** The event includes product ID, new price, currency, and effective date.
3. **OrderPlaced:** The event includes order ID, items, customer ID, and total for downstream processing.

## TypeScript Example
```typescript
bus.publish('OrderUpdated', { orderId: '42', status: 'shipped', lines: [{ sku: 'X', qty: 1 }], total: 199.99 });
```

## Architecture Questions
- What state do consumers need?
- How large can events become?
- Who owns event schema versioning?
- Can sensitive data be included?
- Do consumers need full state or a partial projection?
- How are stale projections corrected?

## When to Use
- Consumers need enough data to update local state.
- Avoiding producer lookups matters.
- Eventual consistency is acceptable.

## When NOT to Use
- Events would expose sensitive data.
- Payloads become too large.
- Consumers only need a change signal.
