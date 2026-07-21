# Materialized View

## Core Idea
Materialized View stores precomputed query results so reads can be faster or simpler.

## Problem It Solves
- Queries are expensive because they require joins, aggregation, transformation, or repeated computation.

## Main Diagram
```text
(Source Tables / Events) -> View Builder -> (Materialized View) -> Read Query
```

## 3 Concrete Examples
1. **Sales Dashboard View:** Daily revenue totals are precomputed for dashboards.
2. **Customer Summary View:** Customer profile, order count, and balance are stored as one read view.
3. **Inventory Availability View:** Product availability is precomputed from stock, reservations, and warehouse data.

## TypeScript Example
```typescript
async function refreshDailySales() {
  await db.query(`
    INSERT INTO daily_sales_mv SELECT date, SUM(amount) FROM orders GROUP BY date
    ON CONFLICT (date) DO UPDATE SET total = EXCLUDED.total`);
}
// Sales Dashboard View:
```

## Architecture Questions
- What query is too expensive?
- How fresh must the view be?
- How is the view updated?
- Can stale data be tolerated?
- Who owns the view?
- How is rebuild handled?

## When to Use
- Queries are expensive.
- Read performance matters.
- Stale or asynchronously updated views are acceptable.

## When NOT to Use
- Fresh data is mandatory.
- The query is already fast.
- View update/rebuild ownership is unclear.
