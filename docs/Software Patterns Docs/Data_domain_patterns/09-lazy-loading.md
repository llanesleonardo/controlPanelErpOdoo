# Lazy Loading

## Core Idea
Lazy Loading delays loading data until it is actually needed.

## Problem It Solves
- Loading entire object graphs upfront can waste memory, time, and database calls.

## Main Diagram
```text
Domain Object -> Lazy Reference / Proxy -> (Database) -> Loaded Related Data
```

## 3 Concrete Examples
1. **Customer Orders:** Customer is loaded first; orders are loaded only when accessed.
2. **Product Images:** Product metadata loads immediately, large images load later.
3. **Document Attachments:** Document record loads first; attachment binary loads on demand.

## TypeScript Example
```typescript
class Order {
  private _lines?: LineItem[];
  get lines() { return this._lines ??= db.loadLines(this.id); } // loaded on first access
}
// Customer Orders:
const order = new Order();
```

## Architecture Questions
- Which data is expensive and optional?
- When is the data actually needed?
- Will lazy loading cause N+1 query problems?
- Can the caller tell when database access happens?
- Is eager loading better for this use case?
- How is lazy loading handled outside a database session?

## When to Use
- Related data is expensive and not always needed.
- Initial load should be fast.
- Optional object graph loading makes sense.

## When NOT to Use
- It creates N+1 query problems.
- Database access must be explicit.
- The session may be closed before data access.
