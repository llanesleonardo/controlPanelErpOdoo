# Soft Delete

## Core Idea
Soft Delete marks records as deleted instead of physically removing them.

## Problem It Solves
- Records need to disappear from normal use while remaining recoverable or auditable.

## Main Diagram
```text
Active Record -> Soft Delete Action -> Record with deleted_at -> Normal Queries Exclude Deleted -> Optional Hard Purge Later
```

## 3 Concrete Examples
1. **Deleted User Account:** User is marked deleted_at but retained for audit and restore.
2. **Archived Product:** Product is hidden from catalog but kept for historical orders.
3. **Removed Document:** Document is marked deleted so it can be restored within retention period.

## TypeScript Example
```typescript
async function deleteUser(id: string) {
  await db.query('UPDATE users SET deleted_at = NOW() WHERE id = $1', [id]);
}
async function listUsers() {
  return db.query('SELECT * FROM users WHERE deleted_at IS NULL');
}
```

## Architecture Questions
- Why must deleted data be retained?
- What column marks deletion?
- Should deleted records be restorable?
- How do queries exclude deleted records?
- What is the permanent purge policy?
- How does soft delete interact with unique constraints?

## When to Use
- Deleted data must be recoverable or auditable.
- Historical relationships need retained records.
- Deletion should be reversible for a period.

## When NOT to Use
- Data must be permanently removed immediately.
- Queries cannot reliably exclude deleted data.
- Retained records create compliance risk.
