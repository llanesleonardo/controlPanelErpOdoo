# Bulkhead

## Core Idea
Bulkhead isolates resources so one failing or overloaded area does not sink the whole system.

## Problem It Solves
- One dependency or workload can consume all shared threads, connections, or capacity and break unrelated features.

## Main Diagram
```text
Application -> Checkout Pool -> Search Pool -> Reporting Pool -> Payment API
```

## 3 Concrete Examples
1. **Separate Thread Pools:** Payment calls and search calls use separate pools so search failures do not block checkout.
2. **Connection Pool Isolation:** Reporting queries use a separate database pool from customer-facing transactions.
3. **Tenant Isolation:** A noisy tenant is limited to its own resource pool.

## TypeScript Example
```typescript
const critical = pLimit(20);
const batch = pLimit(5);
await critical(() => paymentSvc.charge(order));
await batch(() => reportSvc.generate(order));
// Separate Thread Pools:
// Bulkhead isolates resources so one failing or overloaded area does no...
```

## Architecture Questions
- Which workloads can interfere with each other?
- What resources should be isolated?
- How much capacity does each bulkhead get?
- What happens when a bulkhead fills?
- Which workloads are business-critical?
- How are bulkheads monitored?

## When to Use
- Workloads can starve each other.
- Critical paths need isolation.
- Resource pools can be separated meaningfully.

## When NOT to Use
- There is no meaningful workload boundary.
- Isolation wastes too many resources.
- The system is too small for bulkhead overhead.
