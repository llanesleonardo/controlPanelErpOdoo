# Value Object

## Core Idea
A Value Object is defined by its attributes, has no identity, and is usually immutable.

## Problem It Solves
- Important domain concepts are represented as primitive values, causing validation and meaning to spread everywhere.

## Main Diagram
```text
Value Object -> Attribute A -> Attribute B -> Validation / Invariants -> Immutable
```

## 3 Concrete Examples
1. **Money:** Amount and currency are kept together and validated as one concept.
2. **Address:** Street, city, state, and postal code form a value object.
3. **DateRange:** Start and end dates are validated together.

## TypeScript Example
```typescript
class Voltage {
  constructor(private readonly millivolts: number) {
    if (millivolts < 0) throw new Error('Invalid');
  }
  equals(other: Voltage) { return this.millivolts === other.millivolts; }
}
```

## Architecture Questions
- Is this object defined by value rather than identity?
- Should it be immutable?
- What validation belongs inside it?
- Can it replace primitive obsession?
- How is equality determined?
- Should it be embedded inside an entity or aggregate?

## When to Use
- The concept is defined by values, not identity.
- Immutability and validation are useful.
- You want to remove primitive obsession.

## When NOT to Use
- Identity matters.
- The object must be heavily mutable.
- It is only a thin wrapper with no meaning or validation.
