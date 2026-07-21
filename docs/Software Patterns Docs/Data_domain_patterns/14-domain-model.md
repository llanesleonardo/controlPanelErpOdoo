# Domain Model

## Core Idea
Domain Model represents business concepts, rules, and behavior as rich objects.

## Problem It Solves
- Business logic is complex and becomes hard to manage as procedural scripts or database-centric code.

## Main Diagram
```text
Domain Model -> Entities -> Value Objects -> Aggregates -> Domain Services
```

## 3 Concrete Examples
1. **Insurance Policy Model:** Policy, claim, coverage, and deductible objects enforce business rules.
2. **Banking Account Model:** Account and transaction objects protect balance invariants.
3. **Subscription Billing Model:** Subscription, plan, invoice, and renewal objects model billing behavior.

## TypeScript Example
```typescript
class Shipment {
  ship() {
    if (this.weight.exceeds(this.carrier.limit)) throw new Error('Too heavy');
    this.status = 'shipped';
    this.events.push(new ShipmentDispatched(this.id));
  }
}
```

## Architecture Questions
- Is the domain complex enough to justify rich objects?
- What are the core business concepts?
- What invariants must objects protect?
- Where do entities, value objects, aggregates, and services belong?
- Can business rules be tested without infrastructure?
- How is persistence kept from dominating the model?

## When to Use
- Business rules are complex.
- Domain concepts deserve rich behavior.
- You want business logic testable outside infrastructure.

## When NOT to Use
- The app is simple CRUD.
- The team will build anemic objects with all logic elsewhere.
- The modeling cost is not justified.
