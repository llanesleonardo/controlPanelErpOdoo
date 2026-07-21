# Feature Flags

## Core Idea
Feature Flags separate deployment from release by controlling behavior with runtime configuration.

## Problem It Solves
- Teams need to deploy code safely while enabling, disabling, or targeting features without redeploying.

## Main Diagram
```text
Request -> Application -> Feature Flag Service -> Old Behavior -> New Behavior
```

## 3 Concrete Examples
1. **Gradual Feature Rollout:** A new checkout flow is enabled for 10% of users.
2. **Kill Switch:** A faulty recommendation feature is turned off immediately.
3. **Tenant-Specific Feature:** A beta feature is enabled only for selected customers.

## TypeScript Example
```typescript
const flags = { newDashboard: process.env.FF_NEW_DASHBOARD === 'true' };
function renderHome(user: User) {
  return flags.newDashboard ? newDashboard(user) : legacyDashboard(user);
}
// Gradual Feature Rollout:
renderHome();
```

## Architecture Questions
- What behavior is controlled by the flag?
- Who can change the flag?
- Is the flag temporary or permanent?
- How is targeting defined?
- What is the safe default?
- How will stale flags be removed?

## When to Use
- Deployment and release should be separated.
- Features need targeted rollout or quick rollback.
- Runtime control is valuable.

## When NOT to Use
- Flags are never cleaned up.
- Flags control deep architectural differences permanently.
- Runtime config changes are unsafe or unaudited.
