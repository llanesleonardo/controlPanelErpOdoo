# Timeout

## Core Idea
Timeout limits how long a caller waits for an operation before treating it as failed.

## Problem It Solves
- Without timeouts, slow or stuck dependencies can consume threads, connections, memory, and user patience indefinitely.

## Main Diagram
```text
Client
  |
Timeout
  |
Implementation
```

## 3 Concrete Examples
1. **HTTP Client Timeout:** A service gives a downstream API 2 seconds before failing the call.
2. **Database Query Timeout:** A reporting query is cancelled after a configured maximum duration.
3. **Queue Processing Timeout:** A worker abandons a stuck task after the visibility timeout expires.

## TypeScript Example
```typescript
const result = await Promise.race([
  fetch('/api/data'),
  sleep(3000).then(() => { throw new Error('Timeout'); }),
]);
// HTTP Client Timeout:
// Timeout limits how long a caller waits for an operation before treati...
```

## Architecture Questions
- What is the maximum acceptable wait time?
- Is the timeout per attempt or total operation?
- What cleanup happens after timeout?
- How does timeout interact with retries?
- What response does the user or caller receive?
- Are timeouts shorter than upstream timeouts?

## When to Use
- Dependencies can hang or become slow.
- Callers need bounded waiting time.
- Resource exhaustion from stuck calls is a risk.

## When NOT to Use
- The operation must complete regardless of duration.
- Timeout cleanup is impossible.
- Timeouts are guessed without considering upstream/downstream budgets.
