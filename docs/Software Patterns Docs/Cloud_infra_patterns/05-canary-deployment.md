# Canary Deployment

## Core Idea
Canary Deployment releases a new version to a small percentage of traffic before gradually increasing exposure.

## Problem It Solves
- A new release may contain bugs, and exposing it to all users at once is risky.

## Main Diagram
```text
Clients -> Traffic Router -> Stable Version -> Canary Version -> Metrics / Alerts
```

## 3 Concrete Examples
1. **5 Percent API Canary:** Route 5% of traffic to v2 and monitor errors before increasing.
2. **Tenant Canary:** Enable the new backend for one internal tenant first.
3. **Region Canary:** Deploy to one low-risk region before global rollout.

## TypeScript Example
```typescript
const routes = [
  { version: 'v2', weight: 10 },
  { version: 'v1', weight: 90 },
];
function pickVersion() {
  return Math.random() < 0.1 ? 'v2' : 'v1';
}
```

## Architecture Questions
- What traffic slice gets the canary?
- Which metrics decide promotion or rollback?
- How long should each stage run?
- Can users be consistently routed to the same version?
- Are database changes compatible with both versions?
- How is rollback automated?

## When to Use
- You want to reduce release risk.
- Metrics can detect bad releases.
- Traffic can be split safely.

## When NOT to Use
- You cannot split traffic reliably.
- You do not have fast metrics or rollback.
- A small traffic slice is not representative.
