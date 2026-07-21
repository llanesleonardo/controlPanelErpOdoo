# Temporal Tables

## Core Idea
Temporal Tables keep historical versions of rows so the database can answer what data looked like at a previous time.

## Problem It Solves
- The system needs point-in-time history, auditability, or time-based queries without manually building history tables everywhere.

## Main Diagram
```text
(Current Table) -> (History Table) -> Update Row -> Point-in-Time Query
```

## 3 Concrete Examples
1. **Customer Address History:** Query where a customer lived on a specific date.
2. **Price History:** Retrieve product price as of order time.
3. **Compliance Audit:** Show previous values of a regulated record over time.

## TypeScript Example
```typescript
// Valid-time tracking with system-versioned rows
const id = 'cell-9';
await db.query(`UPDATE cells SET voltage = $1, valid_to = NOW() WHERE id = $2 AND valid_to IS NULL`, [3.7, id]);
await db.query(`INSERT INTO cells_history SELECT * FROM cells WHERE id = $1`, [id]);
const history = await db.query('SELECT * FROM cells_history WHERE id=$1', [id]);
// query any point in time via valid_from / valid_to columns
```

## Architecture Questions
- Which records need history?
- Do we need valid time, transaction time, or both?
- How much history is retained?
- How are corrections handled?
- Can the database support temporal queries natively?
- How does history affect storage cost?

## When to Use
- Point-in-time queries are required.
- Record history is important.
- The database can manage historical versions.

## When NOT to Use
- History is not needed.
- Storage cost is unacceptable.
- Application-level event history is a better fit.
