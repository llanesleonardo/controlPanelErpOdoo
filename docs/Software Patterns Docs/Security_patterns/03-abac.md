# ABAC

## Core Idea
Attribute-Based Access Control makes authorization decisions using attributes of the subject, resource, action, and environment.

## Problem It Solves
- Role-based permissions are too coarse for contextual or fine-grained authorization needs.

## Main Diagram
```text
Access Request -> Subject Attributes -> Resource Attributes -> Action -> Environment Attributes
```

## 3 Concrete Examples
1. **Document Access:** A user can view a document only if department matches and classification allows it.
2. **Banking Operations:** A transfer approval depends on user level, amount, region, and time of day.
3. **Healthcare Access:** A clinician can view records only for assigned patients and active treatment context.

## TypeScript Example
```typescript
function canAccess(user: User, resource: Resource) {
  return user.dept === resource.ownerDept && user.clearance >= resource.classification;
}
// Document Access:
canAccess();
// Attribute-Based Access Control makes authorization decisions using at...
```

## Architecture Questions
- Which attributes matter for access decisions?
- Where do attributes come from?
- Are attributes trustworthy and fresh?
- How are policies written and tested?
- How are policy decisions audited?
- Can policy complexity become unmanageable?

## When to Use
- Access depends on context or attributes.
- RBAC roles are too coarse.
- Fine-grained policy decisions are required.

## When NOT to Use
- Attributes are unreliable or stale.
- Policy complexity cannot be governed.
- Simple RBAC is enough.
