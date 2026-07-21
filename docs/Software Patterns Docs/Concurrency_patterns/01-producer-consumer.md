# Producer-Consumer

## Core Idea
Producer-Consumer separates threads or tasks that create work from threads or tasks that process work, usually through a shared queue.

## Problem It Solves
- Work is produced at a different speed than it can be processed, and producers should not block on slow consumers.

## Main Diagram
```text
Producer 1 -> Producer 2 -> Shared Queue -> Consumer 1 -> Consumer 2
```

## 3 Concrete Examples
1. **Log Processing:** Application threads enqueue log records while a background consumer writes them to disk.
2. **Image Processing:** Upload handlers produce resize jobs and worker threads consume them.
3. **Sensor Data Handling:** A data acquisition thread produces readings while analysis workers consume them.

## TypeScript Example
```typescript
const queue: Task[] = [];
function producer(task: Task) { queue.push(task); }
async function consumer() {
  while (queue.length) await process(queue.shift()!);
}
producer({ id: 1 }); consumer();
```

## Architecture Questions
- What work is produced?
- How many producers and consumers exist?
- Is the queue bounded or unbounded?
- What happens when the queue is full?
- Does processing order matter?
- How are shutdown and poison messages handled?

## When to Use
- Producers and consumers run at different speeds.
- Work should be buffered and processed asynchronously.
- You need to smooth bursts or decouple components.

## When NOT to Use
- Processing must be strictly synchronous.
- Queue growth would hide overload.
- Work items depend heavily on shared mutable state.
