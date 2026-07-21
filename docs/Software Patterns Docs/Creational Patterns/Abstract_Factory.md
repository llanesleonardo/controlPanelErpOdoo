# Abstract Factory

## Core Idea
Creates **families of related objects** without the client knowing their concrete classes. The client only depends on factory and product interfaces, making it easy to switch entire product families.

## Problem It Solves
- Removes hard-coded `new` statements.
- Keeps related objects compatible.
- Makes switching implementations easy.

## Main Diagram
```text
Client
   |
AbstractFactory
   |----------------|
WinFactory     MacFactory
 |   |   |      |   |   |
Btn Chk Menu  Btn Chk Menu
```

## 3 Concrete Examples
1. **GUI Toolkit:** Windows vs macOS widgets.
2. **Database Drivers:** SQL Server vs PostgreSQL repositories.
3. **CellNostix/DLM:** Factory creates DAQ drivers (ZKETech, Arbin, Chroma) with matching telemetry, commands, and configuration.

## TypeScript Example
```typescript
interface Button { render(): void; }
interface UIFactory { createButton(): Button; }
class WinFactory implements UIFactory {
  createButton() { return { render: () => console.log('Windows'); }; }
}
new App(new WinFactory()).run();
```
## Architecture Questions
- Will multiple product families exist?
- Must products always work together?
- Should clients avoid concrete classes?
- Will new families be added later?
- Can dependency injection select the factory?

## When to Use
- Cross-platform UI.
- Hardware abstraction.
- Plugin architectures.

## When NOT to Use
- Only one implementation exists.
- One object type needs creation.
- Added abstraction provides no benefit.
