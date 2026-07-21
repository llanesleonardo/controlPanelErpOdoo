# Cell-Based Architecture

## Core Idea
Cell-Based Architecture partitions a platform into isolated cells, each serving a subset of users, tenants, or traffic.

## Problem It Solves
- A failure in one part of a large platform should not affect every customer or the whole system.

## Main Diagram
```text
Cell Router -> Cell 1: App + DB -> Cell 2: App + DB -> Cell 3: App + DB -> Shared Control Plane
```

## 3 Concrete Examples
1. **Tenant Cells:** Tenant groups are assigned to separate cells with independent app and database resources.
2. **Regional Cells:** Each region contains isolated app and data stacks.
3. **Large SaaS Isolation:** A noisy or failing customer cell does not affect other cells.

## TypeScript Example
```typescript
const cells = { 'cell-us': usCluster, 'cell-eu': euCluster };
function assignTenant(tenantId: string) {
  const cell = hash(tenantId) % 2 === 0 ? 'cell-us' : 'cell-eu';
  return cells[cell];
}
// Tenant Cells:
```

## Architecture Questions
- What is the cell assignment key?
- What resources are isolated per cell?
- How are tenants/users routed to cells?
- How is capacity managed per cell?
- Can a tenant move between cells?
- What shared services remain outside cells?

## When to Use
- Blast-radius reduction is important.
- Tenants/users can be partitioned.
- Large-scale SaaS isolation is needed.

## When NOT to Use
- The platform is too small.
- Users/tenants cannot be partitioned cleanly.
- Shared dependencies still create global failure.
