# Progressive Delivery

## Core Idea
Progressive Delivery releases changes gradually using automation, metrics, and controlled exposure.

## Problem It Solves
- Releasing to everyone at once increases blast radius when a change is bad.

## Main Diagram
```text
Internal Users -> 5 Percent -> 25 Percent -> 100 Percent -> Health Metrics
```

## 3 Concrete Examples
1. **Canary Release:** A new version starts at 5% traffic and increases if metrics are healthy.
2. **Feature Flag Rollout:** A feature is enabled for internal users, then beta customers, then everyone.
3. **Automated Promotion:** Deployment advances through stages only if error rate and latency stay within thresholds.

## TypeScript Example
```typescript
const rollout = { stable: 90, canary: 10 };
async function route(req: Request) {
  return Math.random() * 100 < rollout.canary ? canary.handle(req) : stable.handle(req);
}
// Canary Release:
await route();
```

## Architecture Questions
- What exposure stages are used?
- What metrics gate progression?
- How is rollback triggered?
- Can users be consistently targeted?
- Are database changes backward compatible?
- Who approves final rollout?

## When to Use
- Release blast radius must be reduced.
- Metrics can guide rollout decisions.
- Traffic or users can be targeted gradually.

## When NOT to Use
- No reliable health metrics exist.
- Traffic cannot be segmented.
- Database changes are not backward compatible.
