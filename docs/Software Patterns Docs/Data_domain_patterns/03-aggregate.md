# Aggregate

## Core Idea
An Aggregate is a cluster of domain objects treated as one consistency boundary, controlled by an aggregate root.

## Problem It Solves
- Related entities can be modified inconsistently when every object is changed directly from anywhere.

## Main Diagram
```text
Aggregate Root -> Child Entity A -> Child Entity B -> Value Object -> Outside Object
```

## 3 Concrete Examples
1. **Order Aggregate:** Order root controls order lines, totals, discounts, and status transitions.
2. **Shopping Cart Aggregate:** Cart root controls items, quantities, and pricing rules.
3. **Bank Account Aggregate:** Account root controls balance changes and transaction rules.

## TypeScript Example
```typescript
class Order { // aggregate root
  private lines: LineItem[] = [];
  addLine(item: LineItem) { if (this.status !== 'draft') throw new Error('Locked'); this.lines.push(item); }
  total() { return this.lines.reduce((s, l) => s + l.price, 0); }
}
// Order Aggregate:
```

## Architecture Questions
- What invariants must always stay consistent?
- Which entity is the aggregate root?
- What objects belong inside the boundary?
- What should be referenced by ID instead of contained?
- How large is the aggregate?
- Does this boundary match transaction needs?

## When to Use
- You need a consistency boundary around related objects.
- Invariants span multiple child objects.
- Only one root should control modifications.

## When NOT to Use
- The object graph is huge and causes contention.
- There are no real invariants.
- You use aggregates as arbitrary folders.
