# Barrier

## Core Idea
Barrier makes multiple threads wait until all participating threads reach the same point before continuing.

## Problem It Solves
- Parallel tasks must complete a phase before any task starts the next phase.

## Main Diagram
```text
Thread 1 Phase A -> Thread 2 Phase A -> Thread 3 Phase A -> Barrier -> Phase B
```

## 3 Concrete Examples
1. **Simulation Step:** All worker threads finish computing the current timestep before the next timestep begins.
2. **Parallel Matrix Operation:** Each worker finishes its block before the merge phase starts.
3. **Game Physics:** All physics workers synchronize before rendering reads results.

## TypeScript Example
```typescript
const barrier = new Barrier(3);
async function worker(id: number) {
  await compute(id);
  await barrier.await(); // all 3 workers meet here
  await finalize(id);
}
```

## Architecture Questions
- How many participants must arrive?
- What happens if one participant fails?
- Is the barrier reusable?
- Can timeouts occur?
- What work runs after the barrier trips?
- Could barrier synchronization become a bottleneck?

## When to Use
- Parallel phases must synchronize.
- No thread should enter the next phase early.
- The number of participants is known.

## When NOT to Use
- Participants are dynamic or unreliable.
- One slow thread would block all progress.
- Phases do not actually require synchronization.
