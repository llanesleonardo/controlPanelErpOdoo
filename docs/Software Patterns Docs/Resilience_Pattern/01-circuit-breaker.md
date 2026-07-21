# Circuit Breaker

## Core Idea
Circuit Breaker stops calls to a failing dependency temporarily so the failure does not cascade through the system.

## Problem It Solves
- A service keeps calling a dependency that is already failing, wasting resources and causing cascading failures.

## Main Diagram
```text
Client
  |
Circuit Breaker
  |
Implementation
```

## 3 Concrete Examples
1. **Payment Provider Outage:** Checkout opens the circuit after repeated payment timeouts and returns a controlled payment-unavailable response.
2. **Recommendation Service Failure:** Product pages skip recommendations when the recommendation service is failing.
3. **Inventory API Timeout:** Order service stops calling inventory after failure thresholds are exceeded and protects its worker threads.

## TypeScript Example
```typescript
let failures = 0;
async function callRemote() {
  if (failures >= 5) throw new Error('Open');
  try { return await rpc(); } catch (e) { failures++; throw e; }
}
// Payment Provider Outage:
```

## Architecture Questions
- Which dependency can fail repeatedly?
- What failures count toward opening the circuit?
- What threshold opens the circuit?
- How long should the circuit stay open?
- What fallback response is acceptable?
- What metrics show whether the dependency recovered?

## When to Use
- Remote dependencies can fail repeatedly.
- Cascading failures are a risk.
- Fallback or controlled failure is acceptable.

## When NOT to Use
- The call is local and cheap.
- No fallback or controlled error exists.
- Opening the circuit would cause more harm than protection.
