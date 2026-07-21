# Retry with Backoff

## Core Idea
Retry with Backoff waits longer between retry attempts, often using exponential backoff and jitter.

## Problem It Solves
- Immediate retries can overload a struggling dependency and make failures worse.

## Main Diagram
```text
Attempt 1 -> Wait 100ms -> Attempt 2 -> Wait 500ms -> Attempt 3
```

## 3 Concrete Examples
1. **Cloud API Rate Limits:** A client backs off after receiving 429 Too Many Requests.
2. **Database Failover:** A service retries connection attempts with increasing delay while the database leader changes.
3. **Message Publishing:** A worker retries message publish attempts with jitter to avoid synchronized retry storms.

## TypeScript Example
```typescript
async function retryBackoff<T>(fn: () => Promise<T>) {
  for (let i = 0; i < 5; i++) {
    try { return await fn(); }
    catch (e) { await sleep(2 ** i * 100); if (i === 4) throw e; }
  }
}
```

## Architecture Questions
- What delay strategy should be used?
- Should jitter be added?
- What is the maximum delay?
- How many attempts are allowed?
- Which errors deserve backoff?
- How does this interact with timeouts and circuit breakers?

## When to Use
- Retries are needed but the dependency may be overloaded.
- Rate limits or transient outages are common.
- You want to avoid retry storms.

## When NOT to Use
- User-facing paths with tight latency budgets.
- Non-idempotent operations without idempotency keys.
- Permanent errors.
