# Fork-Join

## Core Idea
Fork-Join splits a task into smaller subtasks that run in parallel, then joins their results.

## Problem It Solves
- A large task can be divided into independent pieces that can run concurrently.

## Main Diagram
```text
Large Task -> Subtask A -> Subtask B -> Subtask C -> Result A
```

## 3 Concrete Examples
1. **Parallel Array Sum:** Split array into chunks, sum chunks in parallel, combine totals.
2. **Recursive File Search:** Search subdirectories in parallel and combine matches.
3. **Parallel Sorting:** Split list, sort partitions, merge results.

## TypeScript Example
```typescript
async function analyze(channels: number[]) {
  const parts = await Promise.all(channels.map(ch => forkCompute(ch)));
  return parts.reduce((sum, v) => sum + v, 0); // join
}
// Parallel Array Sum:
await analyze();
```

## Architecture Questions
- Can the task be split safely?
- What is the minimum useful task size?
- How are partial results combined?
- Is overhead greater than parallel benefit?
- How many workers are available?
- Can subtasks fail independently?

## When to Use
- A task can be recursively split.
- Subtasks are independent.
- Combining partial results is clear.

## When NOT to Use
- Subtasks are not independent.
- Split/join overhead exceeds benefits.
- Shared state synchronization dominates runtime.
