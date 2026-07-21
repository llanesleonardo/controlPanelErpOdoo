# Decorator

## Core Idea
The **Decorator Pattern** is a structural design pattern used to add new behavior to an object dynamically without modifying the original object.

## Problem It Solves
- Optional behaviors should stack without subclass explosion.
- Base object must stay unchanged.
- Behavior combinations vary at runtime.

## Main Diagram
```text
Client
  |
Decorator
  |
Implementation
```

## 3 Concrete Examples
1. A system sends notifications.
2. A coffee shop app sells drinks.
3. An application reads and writes data streams.

## TypeScript Example
```typescript
class LoggingOrderService implements OrderService {
  constructor(private inner: OrderService) {}
  async create(o: Order) {
    console.log('create', o.id);
    return this.inner.create(o);
  }
}
```

## Architecture Questions
- Do we need to add optional behavior to an object?
- Can these behaviors be combined in different ways?
- Should the base object remain unchanged?
- Would inheritance create too many subclasses?
- Can each extra behavior be represented as a wrapper?
- Should the client keep using the same interface?
- Does behavior order matter?

## When to Use
- You need to add behavior without modifying the original class.
- You have optional features that can be combined.
- Inheritance would create too many subclasses.
- The client should keep using the same interface.
- You need behavior stacking.
- You want each responsibility isolated.
- Behavior may be added at runtime.

## When NOT to Use
- The object does not share a stable interface.
- The added behavior changes the interface.
- The behavior combinations are simple and fixed.
- The chain order is too confusing.
- Debugging wrapper layers becomes harder than the benefit.
- A simple function call or configuration flag is enough.
