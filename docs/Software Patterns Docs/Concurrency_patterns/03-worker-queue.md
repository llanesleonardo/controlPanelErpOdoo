# Worker Queue

## Core Idea
Worker Queue stores units of work that worker threads pull and process independently.

## Problem It Solves
- A system needs controlled background processing and load smoothing between submitters and workers.

## Main Diagram
```text
Submitter -> Worker Queue -> Worker A -> Worker B -> Worker C
```

## 3 Concrete Examples
1. **Email Sending:** Email jobs are queued and processed by worker threads.
2. **File Import:** Rows or files are queued for worker processing.
3. **Task Scheduler:** Scheduled tasks are placed in a worker queue for execution.

## TypeScript Example
```typescript
const { Worker } = require('worker_threads');
const workers = Array.from({ length: 4 }, () => new Worker('./parse.js'));
function enqueue(buffer: Buffer) {
  const w = workers[jobCount++ % workers.length];
  w.postMessage(buffer);
}
```

## Architecture Questions
- What is the unit of work?
- How many workers should run?
- Is the queue persistent or in memory?
- How are failed work items retried?
- Can tasks be processed in parallel safely?
- How is backpressure applied?

## When to Use
- Background tasks need controlled processing.
- Workers should scale independently from submitters.
- Backpressure and retry behavior are needed.

## When NOT to Use
- Immediate result is required.
- Tasks cannot be retried or made idempotent.
- Ordering requirements conflict with parallel workers.
