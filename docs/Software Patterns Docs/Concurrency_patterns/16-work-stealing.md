# Work Stealing

## Core Idea
Work Stealing lets idle workers take tasks from busy workers' queues to improve load balancing.

## Problem It Solves
- Parallel workloads can become imbalanced when some workers finish early while others still have many tasks.

## Main Diagram
```text
Worker 1 Queue: many tasks -> Worker 2 Queue: empty -> Worker 3 Queue: few tasks -> Steal Task
```

## 3 Concrete Examples
1. **Fork-Join Pool:** Idle worker steals recursive subtasks from another worker.
2. **Parallel Search:** Workers steal unexplored branches from busy workers.
3. **Task Runtime:** A runtime balances uneven tasks across CPU cores.

## TypeScript Example
```typescript
class Worker {
  private deque: Task[] = [];
  run() { const task = this.deque.pop() ?? this.stealFromNeighbor(); if (task) execute(task); }
  stealFromNeighbor() { return neighbor.deque.shift(); }
}
// Fork-Join Pool:
```

## Architecture Questions
- Does workload size vary unpredictably?
- Does each worker have a local deque?
- Which side of the queue is stolen from?
- How is synchronization handled?
- Is stealing overhead worth it?
- How are task priorities preserved?

## When to Use
- Parallel task sizes are uneven.
- Workers can run independent tasks.
- Load balancing should happen dynamically.

## When NOT to Use
- Tasks are uniform and static partitioning is enough.
- Stealing overhead is too high.
- Task priority/order must be strict.
