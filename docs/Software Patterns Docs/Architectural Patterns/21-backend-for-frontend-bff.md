# Backend-for-Frontend - BFF

## Core Idea
BFF creates a backend tailored to the needs of a specific frontend or client experience.

## Problem It Solves
- Different clients need different API shapes, but a shared backend API either over-fetches, under-fetches, or leaks internal service complexity.

## Main Diagram
```text
Web Frontend -> Mobile App -> Web BFF -> Mobile BFF -> User Service
```

## 3 Concrete Examples
1. Mobile BFF
2. Web dashboard BFF
3. Partner portal BFF

## TypeScript Example
```typescript
// Mobile BFF aggregates multiple services into one payload
app.get('/mobile/home', async (_req, res) => {
  const [profile, orders, alerts] = await Promise.all([
    userSvc.profile(), orderSvc.recent(), notifySvc.unread(),
  ]);
  res.json({ profile, orders, alerts });
});
```

## Architecture Questions
- Do different frontends need different data shapes?
- Is the frontend calling too many backend services?
- Can the BFF aggregate and tailor responses?
- Who owns the BFF: frontend team or backend team?
- How will authentication and caching work?
- Are we duplicating business logic in BFFs?

## When to Use
- Different clients have different API needs.
- The frontend needs aggregation from multiple services.
- You want to reduce frontend complexity.
- Client-specific performance optimization matters.

## When NOT to Use
- All clients need the same API shape.
- The BFF would duplicate core business logic.
- There are too many BFFs with no ownership discipline.
