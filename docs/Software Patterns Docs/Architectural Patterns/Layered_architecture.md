# Layered Architecture

## Core Idea
**Layered Architecture** organizes software into separate layers, where each layer has a clear responsibility.

## Problem It Solves
- See pattern document.

## Main Diagram
```text
Client
  |
Layered Architecture
  |
Implementation
```

## 3 Concrete Examples
1. A learning platform lets students enroll in courses.
2. A banking app allows customers to transfer money.
3. A hotel system allows guests to reserve rooms.

## TypeScript Example
```typescript
// Presentation -> Business -> Data
class OrderService { constructor(private repo: OrderRepo) {} place(o: Order) { return this.repo.save(o); } }
class OrderRepo { save(o: Order) { return db.insert('orders', o); } }
// Layered Architecture
const orderService = new OrderService();
const orderRepo = new OrderRepo();
```

## Architecture Questions
- Which logic belongs to the UI/controller?
- Which logic belongs to the use case?
- Which rules are core business rules?
- Which code should handle database access?
- Can the enrollment rules be tested without HTTP?
- Can the database be changed without rewriting controllers?
- Are we separating orchestration from business decisions?
- Are dependencies flowing in a clean direction?

## When to Use
- See pattern document.

## When NOT to Use
- See pattern document.
