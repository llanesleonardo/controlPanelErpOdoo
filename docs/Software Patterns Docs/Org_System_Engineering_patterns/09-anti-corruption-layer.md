# Anti-Corruption Layer

## Core Idea
Anti-Corruption Layer protects a clean model from being polluted by another system's model, language, data shape, or assumptions.

## Problem It Solves
- Legacy or external systems use concepts that do not match the new domain model, and directly adopting them would corrupt the new design.

## Main Diagram
```text
Clean Domain Context -> Anti-Corruption Layer -> Legacy / External System
```

## 3 Concrete Examples
1. **ERP Integration:** ERP product and inventory concepts are translated into clean catalog and warehouse concepts.
2. **Legacy CRM:** Old customer statuses and fields are mapped into the new customer domain language.
3. **Payment Provider Boundary:** Vendor-specific payment statuses are translated into internal payment states.

## TypeScript Example
```typescript
class ErpAcl {
  importCustomer(raw: ErpRow): Customer {
    return Customer.create(raw.CUST_NAME, mapRegion(raw.REGION_CD));
  }
}
// ERP Integration:
```

## Architecture Questions
- What external model would corrupt our domain?
- What concepts need translation?
- Which fields or statuses do not map directly?
- Should translation be synchronous or event-driven?
- Who owns the mapping rules?
- How are external changes isolated?

## When to Use
- A legacy/external model would pollute the new domain.
- Translation rules are needed at a boundary.
- The clean context must remain independent.

## When NOT to Use
- The external model already matches the domain.
- A simple adapter is enough.
- The ACL becomes a dumping ground for unrelated logic.
