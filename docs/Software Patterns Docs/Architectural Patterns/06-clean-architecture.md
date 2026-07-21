# Clean Architecture

## Core Idea
Clean Architecture places business rules at the center and makes dependencies point inward.

## Problem It Solves
- Business logic becomes dependent on frameworks, databases, UI, and external tools, making the system hard to test and change.

## Main Diagram
```text
Entities / Enterprise Rules -> Use Cases / Application Rules -> Interface Adapters -> Frameworks and Drivers
```

## 3 Concrete Examples
1. Entities independent of database
2. Use cases independent of controllers
3. Infrastructure implements interfaces defined by inner layers

## TypeScript Example
```typescript
// Domain — no framework imports
class Transfer { constructor(public from: string, public amount: number) {} }
// Use case
class TransferFunds {
  constructor(private accounts: AccountGateway) {}
  execute(t: Transfer) { return this.accounts.move(t.from, t.amount); }
}
```

## Architecture Questions
- What are the enterprise business rules?
- What are the application use cases?
- Which dependencies point inward?
- Are frameworks kept at the outer layer?
- Can use cases be tested without UI and database?
- Are interfaces owned by the inner layers?

## When to Use
- The domain is important and long-lived.
- You need strong testability.
- Frameworks and infrastructure should be replaceable.
- Business rules should survive UI or database changes.

## When NOT to Use
- The app is very small or mostly CRUD.
- The team will create layers without understanding dependency direction.
- The extra abstraction slows delivery without protecting important logic.
