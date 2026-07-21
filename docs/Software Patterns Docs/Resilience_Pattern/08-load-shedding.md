# Load Shedding

## Core Idea
Load Shedding intentionally rejects or drops some work when the system is overloaded to preserve health for accepted work.

## Problem It Solves
- When overload is not controlled, the whole system slows down, queues grow, and eventually everything fails.

## Main Diagram
```text
Incoming Traffic -> Accept Work -> Reject / Drop Work
```

## 3 Concrete Examples
1. **Reject Low-Priority Requests:** During overload, analytics or expensive search requests are rejected before checkout requests.
2. **API Overload Protection:** Gateway returns 503 to excess traffic when backend saturation is high.
3. **Queue Drop Policy:** A telemetry pipeline drops non-critical events when buffers are full.

## TypeScript Example
```typescript
app.use((req, res, next) => {
  if (load.avg > 0.9) return res.status(503).send('Overloaded');
  next();
});
// Reject Low-Priority Requests:
// Load Shedding intentionally rejects or drops some work when the syste...
```

## Architecture Questions
- What overload signal triggers shedding?
- Which traffic is rejected first?
- What error response is returned?
- Can clients retry safely?
- How is priority defined?
- How do we avoid shedding too aggressively?

## When to Use
- The system must protect itself under overload.
- Some traffic is lower priority.
- Rejecting work is better than total collapse.

## When NOT to Use
- All traffic is equally critical.
- Clients cannot handle rejection.
- Shedding policy is unclear or unfair.
