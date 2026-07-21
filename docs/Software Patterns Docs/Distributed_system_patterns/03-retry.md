# Retry

## Core Idea
Retry repeats a failed operation a limited number of times when the failure is likely temporary.

## Problem It Solves
- Transient failures can cause operations to fail even though repeating the operation shortly after would succeed.

## Main Diagram
```text
Call Dependency -> Success -> Return Error
```

## 3 Concrete Examples
1. **Temporary Network Error:** An API client retries a request after a connection reset.
2. **Database Deadlock:** A transaction is retried after a deadlock error.
3. **Queue Publish Failure:** A worker retries publishing a message when the broker briefly disconnects.

## TypeScript Example
```typescript
async function withRetry<T>(fn: () => Promise<T>, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); } catch (e) { if (i === attempts - 1) throw e; }
  }
  throw new Error('unreachable');
}
```

## Architecture Questions
- Is the failure transient or permanent?
- Is the operation safe to repeat?
- How many attempts are allowed?
- Which errors are retryable?
- What happens after all retries fail?
- Could retries amplify load during an outage?

## When to Use
- Failures are transient.
- The operation is idempotent or safe to repeat.
- Retry limits and error classification are clear.

## When NOT to Use
- Permanent validation errors.
- Non-idempotent operations without safeguards.
- High load outages where retries make the system worse.
