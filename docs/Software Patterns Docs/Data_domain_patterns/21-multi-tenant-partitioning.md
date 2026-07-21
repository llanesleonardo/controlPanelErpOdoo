# Multi-Tenant Partitioning

## Core Idea
Multi-Tenant Partitioning separates tenant data logically or physically to support isolation, scaling, security, or cost control.

## Problem It Solves
- A SaaS system must store data for many tenants while controlling isolation, performance, and operations.

## Main Diagram
```text
SaaS Application -> Tenant Resolver -> (Shared DB tenant_id) -> (Schema per Tenant) -> (Dedicated Tenant DB)
```

## 3 Concrete Examples
1. **Shared Table Tenant Column:** All tenants share tables, with tenant_id partitioning rows.
2. **Schema per Tenant:** Each tenant gets separate database schema.
3. **Database per Tenant:** Large or regulated tenants get their own database.

## TypeScript Example
```typescript
function tenantSchema(tenantId: string) { return `tenant_${tenantId}`; }
async function listUsers(tenantId: string) {
  return db.query(`SELECT * FROM ${tenantSchema(tenantId)}.users`);
}
// Shared Table Tenant Column:
await listUsers();
```

## Architecture Questions
- What isolation level does each tenant require?
- Is tenant_id enforced everywhere?
- Do some tenants need dedicated databases?
- How are migrations handled?
- How are noisy tenants isolated?
- How is tenant data exported or deleted?

## When to Use
- You run SaaS for many tenants.
- Tenant isolation and scaling matter.
- Tenant data ownership and lifecycle must be explicit.

## When NOT to Use
- Single-tenant system.
- Tenant boundaries are unclear.
- Operational model cannot support chosen isolation level.
