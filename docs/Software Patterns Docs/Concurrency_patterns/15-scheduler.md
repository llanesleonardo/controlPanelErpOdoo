# Scheduler

## Core Idea
Scheduler decides when tasks run, where they run, and in what priority order.

## Problem It Solves
- Many tasks compete for limited execution resources and need policy-based coordination.

## Main Diagram
```text
Ready Tasks -> Scheduler -> Scheduling Policy -> Executor / Worker
```

## 3 Concrete Examples
1. **Job Scheduler:** Runs background jobs based on time, priority, and dependencies.
2. **Coroutine Scheduler:** Chooses which coroutine resumes next.
3. **Real-Time Scheduler:** Prioritizes time-sensitive tasks over background tasks.

## TypeScript Example
```typescript
class Scheduler {
  private heap: Job[] = [];
  tick() { const job = this.heap.pop(); if (job && job.runAt <= Date.now()) job.run(); }
  schedule(job: Job) { this.heap.push(job); this.heap.sort((a, b) => b.runAt - a.runAt); }
}
// Job Scheduler:
```

## Architecture Questions
- What tasks are scheduled?
- What policy decides priority?
- Are tasks preemptive or cooperative?
- Are deadlines involved?
- How is starvation avoided?
- How are cancellations and retries handled?

## When to Use
- Tasks need execution policy.
- Priorities, deadlines, or fairness matter.
- Execution resources are limited.

## When NOT to Use
- Natural runtime scheduling is enough.
- Custom scheduling policy is not needed.
- The scheduler becomes a hidden god component.
