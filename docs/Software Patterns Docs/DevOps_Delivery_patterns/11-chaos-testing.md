# Chaos Testing

## Core Idea
Chaos Testing deliberately injects controlled failures to verify the system behaves correctly under stress or partial failure.

## Problem It Solves
- Reliability assumptions are often wrong until failure modes are tested.

## Main Diagram
```text
Hypothesis -> Chaos Experiment -> System Under Test -> Metrics / Observability -> Findings / Fixes
```

## 3 Concrete Examples
1. **Kill Instance Test:** Terminate a service instance and verify traffic shifts to healthy replicas.
2. **Network Latency Test:** Inject latency between services and verify timeouts and fallbacks work.
3. **Dependency Outage Drill:** Disable a downstream dependency and verify graceful degradation.

## TypeScript Example
```typescript
describe('resilience', () => {
  it('survives pod kill', async () => {
    await k8s.killRandomPod('orders');
    await expect.poll(() => api.health()).toBe('ok');
  });
});
```

## Architecture Questions
- What hypothesis is being tested?
- What is the blast radius?
- What safeguards stop the experiment?
- What metrics prove success or failure?
- Is production testing safe?
- What fixes are required after findings?

## When to Use
- You have observability and safeguards.
- Reliability assumptions need validation.
- The team can act on findings.

## When NOT to Use
- There is no monitoring or rollback.
- Blast radius cannot be controlled.
- The team is not ready to fix discovered weaknesses.
