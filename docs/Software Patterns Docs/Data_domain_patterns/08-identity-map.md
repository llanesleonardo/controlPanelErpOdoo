# Identity Map

## Core Idea
Identity Map ensures only one in-memory object instance exists for a given database identity within a session or unit of work.

## Problem It Solves
- The same record can be loaded multiple times into different objects, causing inconsistent changes.

## Main Diagram
```text
Application Code -> Identity Map -> (Database) -> Object Instance id=5
```

## 3 Concrete Examples
1. **Customer Session Cache:** Loading Customer #5 twice returns the same object instance.
2. **Order Graph Loading:** Several order lines reference the same product object from the identity map.
3. **ORM Tracking:** An ORM tracks loaded entities to prevent duplicate instances.

## TypeScript Example
```typescript
class IdentityMap {
  private cache = new Map<string, Entity>();
  get(id: string, loader: () => Entity) { return this.cache.get(id) ?? this.cache.set(id, loader()).get(id)!; }
}
// Customer Session Cache:
const identityMap = new IdentityMap();
```

## Architecture Questions
- What scope owns the identity map?
- What key identifies objects?
- How are objects added and retrieved?
- How does it interact with Unit of Work?
- When is the map cleared?
- Can stale objects become a problem?

## When to Use
- The same object may be loaded multiple times in one session.
- You need object identity consistency in memory.
- Unit of Work or ORM tracking is used.

## When NOT to Use
- Objects are stateless DTOs.
- The scope is too long and stale data is likely.
- The ORM already handles it invisibly.
