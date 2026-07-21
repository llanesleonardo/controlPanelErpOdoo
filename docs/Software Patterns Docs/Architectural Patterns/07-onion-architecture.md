# Onion Architecture

## Core Idea
Onion Architecture organizes the system in concentric layers around the domain model, with dependencies pointing inward.

## Problem It Solves
- The domain model is too dependent on infrastructure and application frameworks.

## Main Diagram
```text
Domain Model - Center -> Domain Services -> Application Services -> Infrastructure / UI / Database
```

## 3 Concrete Examples
1. Domain entities at the center
2. Repositories as interfaces near the domain
3. Database implementation outside

## TypeScript Example
```typescript
// Core
interface DomainEvent { type: string; }
// Application
class ApplyCycleStart {
  constructor(private repo: CycleRepo, private events: EventPublisher) {}
  async run(id: string) { const c = await this.repo.get(id); c.start(); await this.events.publish(c.events); }
}
```

## Architecture Questions
- What is the core domain model?
- What domain services exist?
- What application services coordinate use cases?
- Which infrastructure details must stay outside?
- Do dependencies point inward?
- Can infrastructure be replaced without domain changes?

## When to Use
- The domain model is important.
- You want infrastructure independence.
- Business rules need strong protection.
- You want testable domain behavior.

## When NOT to Use
- The domain is weak and mostly CRUD.
- The layers are created mechanically without useful boundaries.
- The team does not need heavy domain protection.
