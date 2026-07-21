# Chaos Engineering

## Core Idea
Chaos Engineering deliberately injects controlled failures to validate system resilience.

## Problem It Solves
- Systems often look reliable on paper but fail under real-world faults that were never tested.

## Main Diagram
```text
Failure Hypothesis -> Chaos Experiment -> System Under Test -> Observability -> Learning / Fixes
```

## 3 Concrete Examples
1. **Instance Termination Test:** Randomly terminate service instances and verify auto-recovery.
2. **Network Latency Injection:** Add latency between services to test timeout and retry behavior.
3. **Dependency Failure Drill:** Disable a downstream dependency and verify graceful degradation.

## TypeScript Example
```typescript
async function chaosTest() {
  const target = pickRandomInstance();
  await target.kill();
  const healthy = await waitForRecovery(30_000);
  if (!healthy) throw new Error('System did not recover');
}
```

## Architecture Questions
- What failure hypothesis are we testing?
- What blast radius is acceptable?
- What safety controls are in place?
- Which metrics prove the system survived?
- Can the experiment be stopped quickly?
- Are we testing in staging, production, or both?

## When to Use
- You already have observability and safety controls.
- You need to validate resilience assumptions.
- Failure drills are valuable.

## When NOT to Use
- No monitoring or rollback exists.
- The blast radius cannot be controlled.
- The team is still fighting basic reliability fires.
