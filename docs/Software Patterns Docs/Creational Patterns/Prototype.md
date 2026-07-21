# Prototype

## Core Idea
Creates new objects by **cloning existing ones** instead of constructing them from scratch.

## Problem It Solves
- Expensive initialization.
- Repeated configuration.
- Runtime copying of objects.

## Main Diagram
```text
Client
  |
Prototype
  |
 clone()
  |
New Object
```

## 3 Concrete Examples
1. Document templates.
2. Game character cloning.
3. Clone a DLM Test Plan and modify only current or cycle count.

## TypeScript Example
```typescript
class ReportTemplate implements Cloneable {
  constructor(public header: string, public sections: string[]) {}
  clone() { return new ReportTemplate(this.header, [...this.sections]); }
}
const draft = template.clone();
// Prototype
```
## Architecture Questions
- Is creation expensive?
- Are objects mostly identical?
- Deep or shallow copy?
- Runtime templates?

## When to Use
- Templates.
- Cached configurations.
- Performance optimization.

## When NOT to Use
- Simple objects.
- Cloning is harder than construction.
