# Retry

## Core Idea
Retry repeats a failed operation when the failure is likely temporary.

## Problem It Solves
- Transient errors such as network resets, temporary overload, or leader failover can fail operations that would succeed shortly after.

## Main Diagram
```text
Call Dependency -> Retry -> Return Success -> Return Failure
```

## 3 Concrete Examples
1. **Database Deadlock:** A transaction is retried after a deadlock error.
2. **API Connection Reset:** An HTTP client retries a request after a temporary network error.
3. **Message Publish Failure:** A worker retries publishing a message when the broker briefly disconnects.

## TypeScript Example
```typescript
for (let attempt = 1; attempt <= 3; attempt++) {
  try { return await upload(chunk); }
  catch (e) { if (attempt === 3) throw e; }
}
// Database Deadlock:
// Retry repeats a failed operation when the failure is likely temporary.
```

## Architecture Questions
- Is the failure transient or permanent?
- Which errors are retryable?
- Is the operation idempotent?
- How many attempts are allowed?
- Should retries use backoff and jitter?
- What happens after retries are exhausted?

## When to Use
- Failures are transient.
- Operations are idempotent or safely repeatable.
- Retry limits and error classification are clear.

## When NOT to Use
- Failures are permanent.
- The operation is not idempotent.
- Retries would worsen overload.
