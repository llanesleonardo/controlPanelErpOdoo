# Circuit Breaker

## Core Idea
Circuit Breaker stops calls to a failing dependency temporarily. It opens after failures, blocks calls for a recovery window, then allows limited trial calls before closing again.

## Problem It Solves
- Repeated calls to a failing dependency can overload the dependency and cause cascading failures.

## Main Diagram
```text
Client
  |
Circuit Breaker
  |
Implementation
```

## 3 Concrete Examples
1. **Payment Provider Failure:** Checkout stops hammering a payment provider that is timing out and returns a controlled failure response.
2. **Search Service Timeout:** The product page skips recommendations when search is down instead of blocking the whole page.
3. **Inventory Dependency Protection:** Order service pauses inventory calls after repeated errors and avoids thread exhaustion.

## TypeScript Example
```typescript
class CircuitBreaker {
  state: 'closed' | 'open' = 'closed';
  async call<T>(fn: () => Promise<T>) {
    if (this.state === 'open') throw new Error('Circuit open');
    try { return await fn(); } catch { this.state = 'open'; throw; }
  }
}
```

## Architecture Questions
- Which dependency failure could cascade through the system?
- What failure rate or timeout threshold opens the circuit?
- What fallback should callers receive?
- How long should the circuit stay open?
- What metrics prove the dependency recovered?
- Can users tolerate degraded behavior?

## When to Use
- Remote calls can fail or timeout.
- Cascading failure is a real risk.
- Fallback or degraded behavior is possible.

## When NOT to Use
- Local in-memory calls.
- Failures must always be retried immediately.
- There is no meaningful fallback or failure handling strategy.
