# Pipes and Filters

## Core Idea
Pipes and Filters decomposes message processing into independent filters connected by pipes.

## Problem It Solves
- A message must pass through multiple transformation or processing steps that should be reusable and independently testable.

## Main Diagram
```text
Input Message -> Filter 1: Parse -> Filter 2: Validate -> Filter 3: Transform -> Filter 4: Route
```

## 3 Concrete Examples
1. **ETL Processing:** Extracted data is validated, normalized, enriched, and loaded.
2. **Order Import Pipeline:** Incoming orders are parsed, validated, translated, routed, and stored.
3. **Telemetry Pipeline:** Raw telemetry is filtered, aggregated, enriched, and written to storage.

## TypeScript Example
```typescript
const result = [validate, enrich, transform, route]
  .reduce((msg, filter) => filter(msg), inboundMessage);
```

## Architecture Questions
- What are the processing stages?
- What message format flows between filters?
- Can filters be reused?
- Does filter order matter?
- How are errors handled between filters?
- Can filters run independently or in parallel?

## When to Use
- Processing can be split into stages.
- Filters should be reusable or testable.
- Data transformation pipeline is natural.

## When NOT to Use
- Processing requires heavy shared mutable state.
- Steps are tightly coupled.
- A simple function is enough.
