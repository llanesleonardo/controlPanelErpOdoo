# Thread Pool

## Core Idea
Thread Pool reuses a fixed or managed group of worker threads to execute many submitted tasks.

## Problem It Solves
- Creating a new thread per task is expensive and can overload the system.

## Main Diagram
```text
Task Submissions -> Task Queue -> Thread Pool -> Worker Thread 1 -> Worker Thread 2
```

## 3 Concrete Examples
1. **Web Server Requests:** Incoming requests are handled by a pool of worker threads.
2. **Background Jobs:** A fixed pool processes report generation jobs.
3. **Database Task Execution:** A limited pool runs database-bound tasks to avoid too many concurrent connections.

## TypeScript Example
```typescript
class ThreadPool {
  private queue: (() => Promise<void>)[] = [];
  constructor(private size: number) { for (let i = 0; i < size; i++) this.worker(); }
  submit(job: () => Promise<void>) { this.queue.push(job); }
  private async worker() { while (true) { const job = await this.dequeue(); await job(); } }
}
```

## Architecture Questions
- What is the ideal pool size?
- Are tasks CPU-bound or I/O-bound?
- Should the queue be bounded?
- What happens when the pool is saturated?
- How are task failures handled?
- How is graceful shutdown performed?

## When to Use
- Many short-lived tasks need execution.
- Creating one thread per task is too expensive.
- Concurrency must be bounded.

## When NOT to Use
- Tasks are long-running and block all workers.
- Unbounded queues hide overload.
- Pool size is guessed with no monitoring.
