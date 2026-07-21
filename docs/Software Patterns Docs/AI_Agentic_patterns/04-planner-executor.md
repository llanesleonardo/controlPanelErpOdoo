# Planner-Executor

## Core Idea
Planner-Executor separates high-level task planning from step-by-step execution.

## Problem It Solves
- Complex tasks fail when the model jumps directly into execution without decomposing goals, constraints, dependencies, and verification steps.

## Main Diagram
```text
Complex Task -> Planner -> Step Plan -> Executor -> Validation
```

## 3 Concrete Examples
1. **Code Refactor Workflow:** Planner breaks a refactor into files and tests; executor applies each change.
2. **Research Report:** Planner creates research questions and source plan; executor gathers and synthesizes evidence.
3. **Migration Project:** Planner sequences migration steps; executor performs tool calls and checks outcomes.

## TypeScript Example
```typescript
async function run(goal: string) {
  const steps = await planner.decompose(goal); // ['fetch data', 'analyze', 'summarize']
  let state = {};
  for (const step of steps) state = await executor.run(step, state);
  return state.summary;
}
```

## Architecture Questions
- What output should the planner produce?
- How detailed should the plan be?
- Can the executor revise the plan when reality changes?
- How is progress tracked?
- What validation happens after each step?
- When should a human approve the plan?

## When to Use
- The task is complex enough to require decomposition.
- Execution steps need validation.
- Plans may need revision as work progresses.

## When NOT to Use
- The task is simple and direct.
- Planning becomes verbose ceremony.
- The executor ignores or cannot adapt the plan.
