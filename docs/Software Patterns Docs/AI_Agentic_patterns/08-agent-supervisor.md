# Agent Supervisor

## Core Idea
Agent Supervisor monitors, coordinates, constrains, and evaluates one or more agents during task execution.

## Problem It Solves
- Autonomous or semi-autonomous agents can drift, loop, misuse tools, exceed scope, or produce unsafe actions without oversight.

## Main Diagram
```text
Task -> Agent Supervisor -> Agent A -> Agent B -> Agent C
```

## 3 Concrete Examples
1. **Coding Supervisor:** Supervisor assigns tasks to coding agents, reviews diffs, and blocks risky changes.
2. **Research Supervisor:** Supervisor checks source quality and ensures all claims are cited.
3. **Operations Supervisor:** Supervisor allows diagnostic actions but requires approval for production changes.

## TypeScript Example
```typescript
class Supervisor {
  constructor(private workers: Worker[]) {}
  async delegate(task: string) {
    const worker = this.workers.find(w => w.canHandle(task))!;
    const result = await worker.run(task);
    if (!result.ok) return this.delegate(task); // re-route
    return result;
  }
}
```

## Architecture Questions
- What agents does the supervisor control?
- What policies does it enforce?
- What actions require escalation?
- How are loops and runaway tool calls prevented?
- How does the supervisor judge success?
- What audit trail is produced?

## When to Use
- Multiple agents or autonomous steps need oversight.
- Tool use must be constrained.
- Quality, safety, or scope control is required.

## When NOT to Use
- There is only one simple deterministic flow.
- The supervisor adds latency without control value.
- Policies are vague and unenforceable.
