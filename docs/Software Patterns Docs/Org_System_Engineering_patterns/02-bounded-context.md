# Bounded Context

## Core Idea
Bounded Context defines a boundary where a domain model, language, and rules are internally consistent.

## Problem It Solves
- Different parts of the business use the same words differently, causing confused models, bad integrations, and duplicated rules.

## Main Diagram
```text
Sales Context -> Billing Context -> Warehouse Context -> Customer means lead/account -> Customer means payer
```

## 3 Concrete Examples
1. **Customer in Sales vs Billing:** Sales sees Customer as a lead/account relationship; Billing sees Customer as a payer with invoices and payment terms.
2. **Product in Catalog vs Warehouse:** Catalog owns product descriptions and marketing attributes; Warehouse owns SKU, stock location, and pickability.
3. **Order in Checkout vs Fulfillment:** Checkout sees order as purchase intent; Fulfillment sees order as work to pick, pack, and ship.

## TypeScript Example
```typescript
// Shipping context vs Billing context — separate models
namespace Shipping { export class Order { trackingId: string; } }
namespace Billing { export class Order { invoiceId: string; } }
// Customer in Sales vs Billing:
const order = new Order();
// Bounded Context defines a boundary where a domain model, language, an...
```

## Architecture Questions
- Where does this business language apply?
- Do different teams mean different things by the same term?
- What model is valid inside this context?
- What concepts cross context boundaries?
- What integration contract is needed between contexts?
- Which context owns which rules and data?

## When to Use
- Business terms mean different things in different areas.
- One model is becoming too large or contradictory.
- Team/domain boundaries need clarity.

## When NOT to Use
- The model is simple and consistent everywhere.
- The team uses contexts as arbitrary folders.
- Boundaries are created without domain language differences.
