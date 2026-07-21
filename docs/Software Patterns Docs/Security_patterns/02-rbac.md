# RBAC

## Core Idea
Role-Based Access Control grants permissions based on assigned roles.

## Problem It Solves
- Managing permissions per user becomes unmanageable as users and permissions grow.

## Main Diagram
```text
User -> Role -> Permission A -> Permission B -> Permission C
```

## 3 Concrete Examples
1. **Admin Dashboard:** Users with Admin role can manage users; Support role can view tickets only.
2. **Hospital System:** Doctor, nurse, billing, and receptionist roles grant different capabilities.
3. **Internal Tooling:** Developer, operator, auditor, and manager roles define system access.

## TypeScript Example
```typescript
const roles = { admin: ['read', 'write', 'delete'], viewer: ['read'] };
function authorize(user: User, action: string) {
  return roles[user.role]?.includes(action) ?? false;
}
// Admin Dashboard:
authorize();
```

## Architecture Questions
- What roles exist in the business?
- What permissions belong to each role?
- Can users have multiple roles?
- How are role assignments approved and audited?
- How is least privilege maintained?
- When does RBAC become too coarse?

## When to Use
- Permissions map cleanly to business roles.
- You need simple and understandable access control.
- Role assignments can be governed and audited.

## When NOT to Use
- Access depends heavily on context.
- Role explosion is happening.
- Roles no longer map to real responsibilities.
