# Facade

## Core Idea
The **Facade Pattern** is a structural design pattern used to provide a simple interface over a complex subsystem.

## Problem It Solves
- Subsystem is complex with many classes.
- Clients need one simple entry point.
- Coupling to internals should be reduced.

## Main Diagram
```text
Client
  |
Facade
  |
Implementation
```

## 3 Concrete Examples
1. An e-commerce app needs to place customer orders.
2. A media application converts uploaded videos.
3. A smart home app needs to start a “movie night” mode.

## TypeScript Example
```typescript
class CheckoutFacade {
  constructor(private pay: Payment, private ship: Shipping, private inv: Inventory) {}
  async checkout(cart: Cart) {
    await this.inv.reserve(cart);
    await this.pay.charge(cart.total);
    return this.ship.dispatch(cart);
  }
}
```

## Architecture Questions
- Is the client coordinating too many subsystem calls?
- Is there a common workflow that should be exposed as one operation?
- Do subsystem details leak into UI or controller code?
- Will the order of operations change over time?
- Do we need one stable API over unstable internals?
- Can we hide payment, inventory, tax, and shipping complexity behind one use-case interface?
- Is this simplification, not interface conversion?

## When to Use
- A subsystem is complex.
- Clients are calling too many internal services directly.
- You want a simpler API for common workflows.
- You want to reduce coupling between clients and subsystem internals.
- You need to hide ordering, coordination, or setup details.
- You want a stable interface over changing internals.
- You want to expose use-case-level operations.

## When NOT to Use
- The subsystem is already simple.
- The facade only forwards calls without simplifying anything.
- The facade becomes a giant god object.
- Clients need full control over subsystem details.
- You are trying to convert an incompatible interface.
- You are trying to add optional behavior to an object.
