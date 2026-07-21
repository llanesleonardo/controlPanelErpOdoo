# Canonical Data Model

## Core Idea
Canonical Data Model defines a shared enterprise message format so integrations do not need custom pairwise translations between every system.

## Problem It Solves
- Many systems have different data formats, creating too many point-to-point mappings.

## Main Diagram
```text
Canonical Data Model -> CRM Format -> ERP Format -> Billing Format -> Support Format
```

## 3 Concrete Examples
1. **Canonical Customer:** CRM, billing, and support all map to one enterprise customer format.
2. **Canonical Order:** E-commerce, warehouse, and accounting exchange a shared order format.
3. **Canonical Product:** PIM, storefront, and ERP use a standard product message.

## TypeScript Example
```typescript
interface CanonicalCustomer { id: string; email: string; region: string; }
function fromLegacy(row: LegacyCustomer): CanonicalCustomer {
  return { id: row.CUST_ID, email: row.EMAIL_ADDR, region: row.REGION_CD };
}
```

## Architecture Questions
- Which concepts deserve canonical models?
- Who governs the canonical schema?
- Can the model avoid becoming too generic?
- How are versions handled?
- Do systems map to canonical at the boundary?
- Is canonical worth the governance cost?

## When to Use
- Many systems need common enterprise message formats.
- Governance is possible.
- You want to reduce pairwise mapping complexity.

## When NOT to Use
- Only two systems integrate.
- Governance is impossible.
- The canonical model becomes bloated and abstract.
