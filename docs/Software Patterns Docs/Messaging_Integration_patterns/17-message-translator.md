# Message Translator

## Core Idea
A Message Translator converts one message format, schema, or protocol into another.

## Problem It Solves
- Two systems need to communicate but use different data formats or naming conventions.

## Main Diagram
```text
Source Message Format -> Message Translator -> Target Message Format
```

## 3 Concrete Examples
1. **Legacy Customer Record:** Legacy customer fields are translated into modern CustomerDTO fields.
2. **XML to JSON:** An old SOAP/XML message is translated into JSON for a REST service.
3. **Vendor Status Mapping:** External payment statuses are translated into internal payment states.

## TypeScript Example
```typescript
function toCanonical(legacy: LegacyOrder): CanonicalOrder {
  return { id: legacy.ORD_ID, currency: legacy.CURR_CD, amount: legacy.AMT };
}
bus.publish('orders', toCanonical(legacyMsg));
// Legacy Customer Record:
// A Message Translator converts one message format, schema, or protocol...
```

## Architecture Questions
- What source and target formats exist?
- Which fields map directly?
- Which fields need transformation or defaults?
- How are validation errors handled?
- Who owns mapping rules?
- How are schema changes versioned?

## When to Use
- Systems use different message formats.
- Mapping rules are stable enough.
- You want format conversion at integration boundaries.

## When NOT to Use
- Both systems can already share a contract.
- Mapping rules are constantly changing.
- Translator becomes a home for business logic.
