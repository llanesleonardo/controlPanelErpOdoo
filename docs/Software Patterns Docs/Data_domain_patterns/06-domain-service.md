# Domain Service

## Core Idea
A Domain Service holds domain logic that does not naturally belong inside a single entity or value object.

## Problem It Solves
- Some business operations involve multiple domain objects and do not fit cleanly inside one object.

## Main Diagram
```text
Domain Service -> Entity A -> Entity B -> Domain Policy
```

## 3 Concrete Examples
1. **Funds Transfer Service:** Coordinates business rules between two bank accounts.
2. **Pricing Service:** Calculates price using product, customer, promotion, and tax rules.
3. **Eligibility Service:** Determines loan eligibility using applicant, credit profile, and policy.

## TypeScript Example
```typescript
class CycleCalculator {
  // Stateless domain logic that doesn't belong on Entity or VO
  estimateLife(cycles: Cycle[], chemistry: Chemistry): number {
    return chemistry.baseLife - cycles.filter(c => c.depth > 80).length * 10;
  }
}
```

## Architecture Questions
- Is this truly domain logic, not application orchestration?
- Why does this behavior not belong on an entity?
- Which domain objects participate?
- Is the service stateless?
- Does it express business language?
- Is it becoming a dumping ground?

## When to Use
- Domain behavior spans multiple objects.
- The operation is business logic, not infrastructure.
- The behavior does not belong naturally on one entity.

## When NOT to Use
- The logic belongs on an entity.
- It is application orchestration, not domain logic.
- It becomes a dumping ground for all business rules.
