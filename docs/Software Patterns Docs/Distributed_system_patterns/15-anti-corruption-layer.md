# Anti-Corruption Layer

## Core Idea
An Anti-Corruption Layer translates between your model and an external model so external assumptions do not leak into your domain.

## Problem It Solves
- A clean domain model must integrate with an external or legacy system whose concepts, data model, or language would pollute the new system.

## Main Diagram
```text
Clean Domain Model -> Anti-Corruption Layer -> Legacy / External System
```

## 3 Concrete Examples
1. **Legacy CRM Integration:** Customer records with old field names are translated into clean domain objects.
2. **External Payment Provider:** Vendor-specific statuses are mapped to internal payment states.
3. **ERP Boundary:** ERP product codes and workflows are isolated behind translation services.

## TypeScript Example
```typescript
class LegacyBillingAcl {
  toDomain(raw: LegacyInvoice): Invoice {
    return { id: raw.INV_NO, amount: parseFloat(raw.AMT_USD) };
  }
}
// Legacy CRM Integration:
```

## Architecture Questions
- What external model would corrupt our domain language?
- What translations are required?
- Which concepts do not map cleanly?
- Should the ACL be synchronous, asynchronous, or both?
- How are errors and statuses mapped?
- Where is the boundary owned?

## When to Use
- A legacy or external model does not match your domain.
- You want to protect clean domain language.
- Vendor concepts should not spread through your code.

## When NOT to Use
- The external model already matches your domain.
- A simple adapter is enough.
- The ACL becomes a place for unrelated business logic.
