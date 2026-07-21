# Domain-Driven Design

## Core Idea
Domain-Driven Design focuses software design around the business domain, shared language, bounded contexts, aggregates, entities, value objects, and domain rules.

## Problem It Solves
- Software becomes database-driven or technology-driven while business rules are scattered, misunderstood, and hard to evolve.

## Main Diagram
```text
Business Domain -> Ubiquitous Language -> Bounded Contexts -> Domain Model -> Aggregates
```

## 3 Concrete Examples
1. **Banking Domain:** Accounts, transfers, limits, holds, and ledger rules are modeled explicitly instead of hidden in transaction scripts.
2. **Insurance Domain:** Policies, claims, coverages, deductibles, and underwriting rules become explicit domain concepts.
3. **Subscription Billing:** Plans, subscriptions, invoices, renewals, credits, and proration rules are modeled as domain behavior.

## TypeScript Example
```typescript
class Cycle extends AggregateRoot {
  complete() {
    if (this.status !== 'running') throw new DomainError('Not running');
    this.apply(new CycleCompleted(this.id));
  }
}
```

## Architecture Questions
- What is the core domain?
- What language do domain experts use?
- What bounded contexts exist?
- What aggregates protect invariants?
- What business rules are currently scattered?
- Which parts of the domain deserve rich modeling?

## When to Use
- The business domain is complex.
- Business rules are central to system value.
- Domain experts and engineers need a shared model.

## When NOT to Use
- The application is simple CRUD.
- No domain experts are available.
- The team applies tactical patterns without strategic understanding.
