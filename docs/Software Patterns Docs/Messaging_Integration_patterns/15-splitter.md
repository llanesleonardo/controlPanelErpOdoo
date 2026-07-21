# Splitter

## Core Idea
A Splitter breaks one complex message into multiple smaller messages that can be processed independently.

## Problem It Solves
- A large message contains multiple items that need separate routing, processing, or scaling.

## Main Diagram
```text
Composite Message -> Splitter -> Part Message A -> Part Message B -> Part Message C
```

## 3 Concrete Examples
1. **Order Line Items:** One order message is split into one message per item for warehouse picking.
2. **CSV Import:** One uploaded file is split into row-level processing messages.
3. **Batch Invoice:** A batch invoice message is split into individual invoice messages.

## TypeScript Example
```typescript
function split(batch: OrderBatch) {
  return batch.items.map(item => ({ type: 'ProcessItem', payload: item }));
}
split(batch).forEach(msg => queue.send(msg));
// Order Line Items:
// A Splitter breaks one complex message into multiple smaller messages ...
```

## Architecture Questions
- What is the unit of splitting?
- Do split messages need correlation back to the original?
- Can split items be processed independently?
- Does order matter?
- How are failures for individual items handled?
- Is aggregation needed later?

## When to Use
- A large message contains independent parts.
- Parts can be processed separately.
- Correlation to the original can be maintained.

## When NOT to Use
- Parts cannot be processed independently.
- Splitting destroys required context.
- Re-aggregation is impossible but required.
