# Strangler Fig

## Core Idea
Strangler Fig wraps the old system and incrementally routes features to a new system until the old system is retired.

## Problem It Solves
- A legacy system must be replaced gradually without a risky big-bang rewrite.

## Main Diagram
```text
Client -> Routing / Facade Layer -> Legacy System -> New System
```

## 3 Concrete Examples
1. **Legacy Monolith Migration:** New order APIs are routed to a new service while old features stay in the monolith.
2. **UI Replacement:** New frontend pages replace old pages one route at a time.
3. **Database Modernization:** New capabilities are built around a legacy database until ownership is moved.

## TypeScript Example
```typescript
function route(req: Request) {
  if (req.path.startsWith('/legacy')) return legacy.handle(req);
  if (req.path.startsWith('/v2')) return modern.handle(req);
  return legacy.handle(req); // gradually shift routes to modern
}
// Legacy Monolith Migration:
```

## Architecture Questions
- Which legacy capability should be replaced first?
- Where can routing be intercepted?
- How will old and new systems share data during transition?
- What is the rollback plan?
- How will parity be validated?
- When is the legacy part retired?

## When to Use
- A full rewrite is too risky.
- Legacy capabilities can be replaced incrementally.
- Routing or interception is possible.

## When NOT to Use
- The legacy system is small enough to replace safely.
- Old and new data cannot coexist.
- No one will actually retire the strangled legacy parts.
