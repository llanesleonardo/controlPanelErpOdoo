# Builder

## Core Idea
Separates **how** a complex object is constructed from the finished object. Build step-by-step instead of using massive constructors.

## Problem It Solves
- Constructors with many parameters.
- Optional configuration.
- Reusable construction process.

## Main Diagram
```text
Client -> Director(optional)
            |
         Builder
            |
     ConcreteBuilder
            |
         Product
```

## 3 Concrete Examples
1. Report builder.
2. SQL query builder.
3. DLM Test Plan builder assembling cycles, RPTs, limits, and steps.

## TypeScript Example
```typescript
const report = new ReportBuilder()
  .title('Cycle Summary')
  .addSection('Metrics', metrics)
  .addChart('Voltage', chartData)
  .build();
// Separates **how** a complex object is constructed from the finished o...
```
## Architecture Questions
- Is construction complex?
- Many optional fields?
- Same object built different ways?
- Need validation during build?
- Immutable final object?

## When to Use
- Large configuration objects.
- Fluent APIs.
- Complex document/test generation.

## When NOT to Use
- Small objects.
- Few constructor parameters.
- Simple initialization.
