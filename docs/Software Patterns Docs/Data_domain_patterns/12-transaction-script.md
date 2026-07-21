# Transaction Script

## Core Idea
Transaction Script organizes business logic as procedural scripts, one per use case or transaction.

## Problem It Solves
- A simple application needs straightforward business workflows without complex domain object modeling.

## Main Diagram
```text
Request -> Transaction Script -> Validate -> Apply Business Logic -> Persist
```

## 3 Concrete Examples
1. **Create Invoice Script:** Validate request, calculate total, save invoice, send email.
2. **Approve Time-Off Script:** Check balance, mark request approved, notify employee.
3. **Refund Order Script:** Check refund rules, call payment provider, update order status.

## TypeScript Example
```typescript
async function transferFunds(from: string, to: string, amount: number) {
  await db.begin();
  try { await db.debit(from, amount); await db.credit(to, amount); await db.commit(); }
  catch (e) { await db.rollback(); throw e; }
}
// Create Invoice Script:
```

## Architecture Questions
- Is the business logic simple and procedural?
- Does each use case fit in one clear script?
- Will duplicated rules become a problem?
- Would a domain model be overkill?
- How are transactions handled?
- Can scripts stay readable as complexity grows?

## When to Use
- Business logic is simple and procedural.
- Each use case is clear and independent.
- A full domain model would be overkill.

## When NOT to Use
- Rules are complex and shared.
- Scripts duplicate business policy.
- A rich domain model is needed.
