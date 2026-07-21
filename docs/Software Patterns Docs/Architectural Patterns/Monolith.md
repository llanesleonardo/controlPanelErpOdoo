# Monolith Architecture

## Core Idea
A **Monolith** is a software architecture where the application is built, packaged, and deployed as one unit.

## Problem It Solves
- See pattern document.

## Main Diagram
```text
Client
  |
Monolith Architecture
  |
Implementation
```

## 3 Concrete Examples
1. A startup is building an online store.
2. A company builds an internal HR platform.
3. A school or training company builds a learning platform.

## TypeScript Example
```typescript
const app = express();
app.get('/orders', listOrders);
app.post('/orders', createOrder);
app.get('/inventory', listStock);
app.listen(3000); // all features in one codebase and deployment
// Monolith Architecture
```

## Architecture Questions
- Is the product still changing quickly?
- Is the team small?
- Do we really need independent service deployments?
- Are module boundaries clear yet?
- Can one database transaction simplify the workflow?
- Would microservices add more operational complexity than value?
- Can we design this as a modular monolith first?
- Which modules may later become services?

## When to Use
- See pattern document.

## When NOT to Use
- See pattern document.
