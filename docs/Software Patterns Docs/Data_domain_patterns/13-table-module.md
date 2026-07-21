# Table Module

## Core Idea
Table Module organizes business logic around database tables rather than individual domain objects.

## Problem It Solves
- Business logic operates naturally on sets of records, but a full object model is unnecessary.

## Main Diagram
```text
Application -> Table Module -> (Database Table) -> Record Set
```

## 3 Concrete Examples
1. **Payroll Table Module:** Payroll logic processes employee rows as a set.
2. **Inventory Table Module:** Inventory adjustments operate on product stock records.
3. **Invoice Table Module:** Invoice calculations operate on invoice and line tables.

## TypeScript Example
```typescript
const Orders = {
  table: 'orders',
  findByCustomer(custId: string) { return db.query(`SELECT * FROM ${this.table} WHERE customer_id=$1`, [custId]); },
};
const rows = await Orders.findByCustomer('cust-9');
// one module per table — logic grouped by table, not entity
```

## Architecture Questions
- Does the logic operate on table-like record sets?
- Is an object-per-row model unnecessary?
- Can table-level services hold the behavior clearly?
- Does this fit the database-centric application style?
- Will the module become a god table service?
- Would Domain Model be better for complex behavior?

## When to Use
- Logic naturally operates on table-like record sets.
- The app is database-centric.
- A row-object domain model is unnecessary.

## When NOT to Use
- Behavior is object-centric, not table-centric.
- Domain concepts have complex lifecycles.
- It becomes a god service per table.
