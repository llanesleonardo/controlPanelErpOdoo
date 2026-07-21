# Rate Limiting

## Core Idea
Rate Limiting restricts how many requests are allowed over a time window or budget.

## Problem It Solves
- Clients or tenants can send too many requests and degrade service for everyone.

## Main Diagram
```text
Client -> Rate Limiter -> Service -> 429 Too Many Requests
```

## 3 Concrete Examples
1. **Public API Quotas:** A partner can make 1,000 requests per minute.
2. **Login Protection:** A user can attempt login only a limited number of times.
3. **Tenant Fairness:** One tenant cannot consume all shared API capacity.

## TypeScript Example
```typescript
const limiter = new RateLimiter({ tokensPerInterval: 100, interval: 'minute' });
app.use((req, res, next) => {
  if (!limiter.tryRemoveTokens(1)) return res.status(429).send('Rate limited');
  next();
});
// Public API Quotas:
```

## Architecture Questions
- What identity is limited: user, API key, IP, tenant, or route?
- What limit and time window are fair?
- What response is returned when limit is exceeded?
- Should limits be global or per instance?
- Do premium customers get higher limits?
- How are limits monitored and adjusted?

## When to Use
- Shared resources need protection.
- APIs are exposed to clients or tenants.
- Fairness and abuse prevention matter.

## When NOT to Use
- Traffic is fully trusted and low volume.
- Limits would break critical internal workflows.
- You cannot identify callers reliably.
