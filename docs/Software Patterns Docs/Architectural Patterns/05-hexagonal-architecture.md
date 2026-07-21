# Hexagonal Architecture - Ports and Adapters

## Core Idea
Hexagonal Architecture isolates the application core from external systems using ports and adapters.

## Problem It Solves
- Business logic becomes polluted by frameworks, databases, UI code, vendor SDKs, and infrastructure details.

## Main Diagram
```text
Application Core -> Input Ports -> Output Ports -> REST Adapter -> CLI Adapter
```

## 3 Concrete Examples
1. Core business logic independent from REST and database
2. Swap database adapter without changing use cases
3. Test application core without real infrastructure

## TypeScript Example
```typescript
interface OrderRepo { save(o: Order): Promise<void>; }
class PlaceOrder {
  constructor(private repo: OrderRepo) {}
  async execute(cmd: PlaceOrderCmd) { await this.repo.save(new Order(cmd)); }
}
// Adapter implements OrderRepo with Postgres
```

## Architecture Questions
- What is the application core?
- What are the input ports?
- What output ports does the core need?
- Which external systems need adapters?
- Can business logic be tested without database or HTTP?
- Are dependencies pointing toward the core?

## When to Use
- Business logic must be protected from infrastructure.
- You need high testability.
- External systems may change.
- You want clear boundaries between core and adapters.

## When NOT to Use
- The system is simple CRUD with little business logic.
- The abstraction overhead is not justified.
- The team does not understand dependency inversion.
