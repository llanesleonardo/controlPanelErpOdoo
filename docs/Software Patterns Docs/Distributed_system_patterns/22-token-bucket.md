# Token Bucket

## Core Idea
Token Bucket adds tokens at a fixed rate. Requests consume tokens. If tokens are available, requests pass; if not, they are rejected or delayed.

## Problem It Solves
- A system needs rate limiting that allows bursts up to a limit while maintaining an average rate.

## Main Diagram
```text
Token Refill -> Token Bucket -> Request -> Allow -> Deny / Delay
```

## 3 Concrete Examples
1. **API Burst Control:** A client can burst briefly but is limited over time.
2. **Upload Bandwidth Control:** A user can send bursts while staying within average bandwidth.
3. **Tenant Request Budget:** Each tenant receives tokens at a configured rate.

## TypeScript Example
```typescript
class TokenBucket {
  private tokens = 10;
  allow() { if (this.tokens > 0) { this.tokens--; return true; } return false; }
  refill() { this.tokens = Math.min(10, this.tokens + 1); }
}
// API Burst Control:
```

## Architecture Questions
- What is the token refill rate?
- What is the bucket capacity?
- How many tokens does each request cost?
- Are requests rejected or queued when empty?
- Is the bucket per user, tenant, IP, or route?
- Does the limiter need to be distributed?

## When to Use
- Bursts should be allowed.
- Average rate must be controlled.
- Caller-specific quotas are needed.

## When NOT to Use
- Traffic must be smoothed strictly with no bursts.
- A simple fixed window is sufficient.
- Distributed coordination overhead is too high.
