# Entity

## Core Idea
An Entity is a domain object defined by identity and lifecycle rather than only its attributes.

## Problem It Solves
- The system needs to track the same conceptual object over time even as its data changes.

## Main Diagram
```text
Entity -> Identity -> Mutable State -> Domain Behavior -> Lifecycle
```

## 3 Concrete Examples
1. **Customer Entity:** A customer keeps the same identity even when name or address changes.
2. **Order Entity:** An order is tracked by order ID through created, paid, shipped, and cancelled states.
3. **Employee Entity:** An employee remains the same employee through role, manager, and salary changes.

## TypeScript Example
```typescript
class Cell {
  constructor(public readonly id: string, private serial: string) {}
  equals(other: Cell) { return this.id === other.id; } // identity by id, not attributes
}
// Customer Entity:
const cell = new Cell();
```

## Architecture Questions
- What makes this object the same object over time?
- What is its identity?
- What lifecycle states does it have?
- Which attributes can change?
- Which invariants must the entity protect?
- Is this really an entity or just a value object?

## When to Use
- Object identity matters over time.
- The object has a lifecycle.
- Attributes can change while identity remains stable.

## When NOT to Use
- The concept is fully defined by attributes.
- There is no lifecycle or identity.
- A value object would be simpler.
