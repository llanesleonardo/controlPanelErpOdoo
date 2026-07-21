# Fail Fast

## Core Idea
Fail Fast detects invalid or impossible conditions early and stops immediately instead of continuing in a bad state.

## Problem It Solves
- Systems that continue after invalid input, missing dependencies, or corrupted state often fail later in harder-to-debug ways.

## Main Diagram
```text
Input / Startup / Request -> Validate Preconditions -> Process -> Fail Immediately
```

## 3 Concrete Examples
1. **Startup Dependency Check:** A service refuses to start if required configuration or secrets are missing.
2. **Invalid Request Rejection:** An API rejects malformed commands before touching downstream services.
3. **Capacity Guard:** A worker rejects new work immediately when required resources are unavailable.

## TypeScript Example
```typescript
function withdraw(account: Account, amount: number) {
  if (account.balance < amount) throw new InsufficientFundsError();
  account.balance -= amount;
}
// Startup Dependency Check:
withdraw();
```

## Architecture Questions
- What conditions should stop processing immediately?
- What checks can happen early?
- What error should be returned?
- Can failing fast prevent wasted downstream work?
- How are fail-fast decisions logged?
- Could fail fast reduce availability unnecessarily?

## When to Use
- Invalid conditions can be detected early.
- Continuing would waste resources or corrupt state.
- Clear errors are better than delayed failures.

## When NOT to Use
- Temporary waiting would resolve the issue safely.
- The fail-fast condition is unreliable.
- It rejects valid work too often.
