# Graceful Degradation

## Core Idea
Graceful Degradation keeps core functionality available while reducing or disabling non-critical features during failure.

## Problem It Solves
- A partial dependency failure should not take down the entire user experience.

## Main Diagram
```text
User Request -> Core Feature -> Optional Feature -> Full Response -> Degraded Response
```

## 3 Concrete Examples
1. **Product Page Without Recommendations:** The product page still loads even if recommendations are unavailable.
2. **Checkout Without Promo Engine:** Checkout proceeds without applying optional promotions if the promo service is down.
3. **Read-Only Mode:** An app disables writes but still allows users to view existing data.

## TypeScript Example
```typescript
async function getRecommendations(userId: string) {
  try { return await mlSvc.recommend(userId); }
  catch { return staticFallback.for(userId); }
}
// Product Page Without Recommendations:
await getRecommendations();
```

## Architecture Questions
- What is core functionality?
- What features can be degraded?
- What user message is appropriate?
- How is degraded mode triggered?
- How is degraded mode exited?
- How do we avoid hiding serious failures too long?

## When to Use
- Partial functionality is better than total outage.
- Optional features can be disabled.
- Users can tolerate reduced capability.

## When NOT to Use
- The feature is core and cannot be degraded.
- Users would receive misleading results.
- Degraded mode hides serious failures indefinitely.
