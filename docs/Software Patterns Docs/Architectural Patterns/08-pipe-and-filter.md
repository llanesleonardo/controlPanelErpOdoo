# Pipe and Filter Architecture

## Core Idea
Pipe and Filter breaks processing into independent filters connected by pipes, where each filter transforms data and passes it to the next stage.

## Problem It Solves
- A process requires multiple independent transformations that should be reusable, composable, and easier to test.

## Main Diagram
```text
Input Data -> Filter 1: Validate -> Filter 2: Transform -> Filter 3: Enrich -> Filter 4: Export
```

## 3 Concrete Examples
1. ETL pipeline
2. Image processing pipeline
3. Compiler phases

## TypeScript Example
```typescript
const pipeline = [parseCsv, validateRows, normalizeUnits, insertDb];
function run(data: string) {
  return pipeline.reduce((acc, filter) => filter(acc), data);
}
run(rawTelemetryExport);
// Pipe and Filter Architecture
```

## Architecture Questions
- Can the workflow be broken into independent stages?
- What data format flows between stages?
- Can filters be reused in different pipelines?
- Does order matter?
- Can filters run streaming or batch?
- How will failures be handled between stages?

## When to Use
- Data moves through clear transformation steps.
- Each step can be independent.
- Stages need to be reusable or reorderable.
- Streaming or batch processing fits the problem.

## When NOT to Use
- Steps are highly interdependent.
- The workflow needs complex back-and-forth interaction.
- Shared mutable state is required across many steps.
