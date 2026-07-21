# Factory Method

## Core Idea
Delegates object creation to subclasses or creator classes. The client requests an abstract product while the creator chooses the concrete implementation.

## Problem It Solves
- Removes direct instantiation.
- Supports extensibility.
- Follows Open/Closed Principle.

## Main Diagram
```text
Client
  |
Creator
  |
factoryMethod()
 /        \
A Creator  B Creator
 |           |
ProdA      ProdB
```

## 3 Concrete Examples
1. PDF/Word document creators.
2. Notification (Email/SMS/Slack).
3. DAQ creator selecting Single Test, Cycle Life, or RPT test.

## TypeScript Example
```typescript
abstract class ParserFactory { abstract create(): Parser; parse(raw: string) { return this.create().parse(raw); } }
class CsvFactory extends ParserFactory { create() { return new CsvParser(); } }
// Factory Method
const parserFactory = new ParserFactory();
const csvFactory = new CsvFactory();
// Delegates object creation to subclasses or creator classes. The clien...
```
## Architecture Questions
- Will new product types appear?
- Should clients know implementations?
- Does each creator own one product?
- Can subclasses customize creation?

## When to Use
- Extensible frameworks.
- Plugin systems.
- Device-specific behavior.

## When NOT to Use
- One concrete product.
- Simple factory function is enough.
