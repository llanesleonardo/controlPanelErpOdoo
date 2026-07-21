# Bulkhead

## Core Idea
Bulkhead isolates resources so failure in one area does not take down the entire system.

## Problem It Solves
- A failure or overload in one part of the system can consume all shared resources and sink unrelated parts.

## Main Diagram
```text
Application -> Checkout Resource Pool -> Search Resource Pool -> Reporting Resource Pool -> Payment Dependency
```

## 3 Concrete Examples
1. **Separate Thread Pools:** Payment calls use a separate thread pool from product search calls.
2. **Tenant Isolation:** One noisy tenant cannot consume all worker capacity.
3. **Connection Pool Isolation:** Reporting queries use a separate DB pool from checkout queries.

## TypeScript Example
```typescript
const paymentPool = pLimit(10);
const searchPool = pLimit(50);
await paymentPool(() => paymentSvc.charge(order));
await searchPool(() => searchSvc.query(order.customerId));
```

## Architecture Questions
- Which workloads can starve others?
- What resources should be isolated?
- What limits should each bulkhead have?
- What happens when a bulkhead is full?
- Which workloads are business-critical?
- How will isolation be monitored?

## When to Use
- Workloads have different criticality.
- Resource exhaustion in one path must not affect others.
- You need predictable failure containment.

## When NOT to Use
- The system is small and resource contention is not a problem.
- Isolation overhead would waste scarce resources.
- You cannot define meaningful workload boundaries.
