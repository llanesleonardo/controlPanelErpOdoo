# Pipeline

## Core Idea
Pipeline splits processing into stages where each stage runs independently and passes results to the next stage.

## Problem It Solves
- A multi-step process needs concurrency and separation of responsibilities between stages.

## Main Diagram
```text
Input -> Stage 1 -> Stage 2 -> Stage 3 -> Stage 4
```

## 3 Concrete Examples
1. **Video Processing:** Decode, filter, encode, and upload run as pipeline stages.
2. **Data Import:** Read, parse, validate, transform, and save records.
3. **Compiler Pipeline:** Lexing, parsing, semantic analysis, optimization, and code generation.

## TypeScript Example
```typescript
function pipeline<T>(input: T[], ...stages: Array<(v: T) => T>) {
  return stages.reduce((data, stage) => data.map(stage), input);
}
const rows = pipeline(rawCsv, parseRow, validate, normalize);
for (const batch of chunk(rows, 100)) await db.insert(batch);
```

## Architecture Questions
- What are the processing stages?
- Can stages run concurrently?
- What buffer exists between stages?
- Which stage is the bottleneck?
- How are errors propagated?
- Does ordering need to be preserved?

## When to Use
- Processing has clear stages.
- Stages can run concurrently.
- A staged design improves throughput or clarity.

## When NOT to Use
- Stages are tightly coupled.
- One stage needs random access to all state.
- A simple sequential process is enough.
