# Checkpointing

## Core Idea
Checkpointing periodically saves progress so work can resume from a known point after failure.

## Problem It Solves
- Long-running tasks lose too much progress when they fail and must restart from the beginning.

## Main Diagram
```text
Start Work -> Process Chunk -> Save Checkpoint -> Process Next Chunk -> Failure
```

## 3 Concrete Examples
1. **Batch Import:** A file importer saves the last processed row and resumes after failure.
2. **Machine Learning Training:** Training saves model checkpoints after epochs.
3. **Stream Processing:** A consumer commits offsets after processing batches.

## TypeScript Example
```typescript
let offset = await store.get('offset') ?? 0;
for (const batch of stream.from(offset)) {
  await process(batch);
  offset += batch.length;
  await store.set('offset', offset);
}
```

## Architecture Questions
- What progress state must be saved?
- How often should checkpoints occur?
- Is checkpointing atomic with output writes?
- How is checkpoint corruption handled?
- How much reprocessing is acceptable?
- Where are checkpoints stored?

## When to Use
- Tasks are long-running.
- Restarting from scratch is expensive.
- Progress can be saved reliably.

## When NOT to Use
- Work is short and cheap to restart.
- Checkpoints cannot be made consistent.
- Checkpoint overhead dominates processing.
