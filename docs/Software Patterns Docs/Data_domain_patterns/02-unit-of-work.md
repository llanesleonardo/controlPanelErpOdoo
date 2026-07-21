# Unit of Work

## Core Idea
Unit of Work tracks changes to objects during a business transaction and commits them together.

## Problem It Solves
- Multiple changes must be saved atomically, but scattered save calls make consistency hard to control.

## Main Diagram
```text
Use Case -> Unit of Work -> Changed Entity A -> Changed Entity B -> New Entity C
```

## 3 Concrete Examples
1. **Order Checkout:** Create order, reserve inventory, and update customer balance in one transaction scope.
2. **Bank Transfer:** Debit one account, credit another, and record transaction as one unit.
3. **Bulk Import:** Track created and modified entities, then commit or rollback the batch.

## TypeScript Example
```typescript
class UnitOfWork {
  private newOrders: Order[] = [];
  registerNew(o: Order) { this.newOrders.push(o); }
  async commit() { await db.transaction(async tx => { for (const o of this.newOrders) await tx.insert(o); }); }
}
// Order Checkout:
```

## Architecture Questions
- What is the transaction boundary?
- Which objects are changed inside the unit?
- When are changes flushed to the database?
- What happens if one save fails?
- Does the ORM already provide Unit of Work?
- How does this interact with repositories?

## When to Use
- Multiple changes must commit or rollback together.
- You need one transaction boundary around a use case.
- An ORM/session already tracks changes.

## When NOT to Use
- Only one simple write occurs.
- Transactions are not needed.
- The abstraction conflicts with the framework's transaction model.
