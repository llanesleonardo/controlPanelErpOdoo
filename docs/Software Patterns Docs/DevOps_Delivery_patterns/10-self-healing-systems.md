# Self-Healing Systems

## Core Idea
Self-Healing Systems automatically detect failure and take corrective action without human intervention.

## Problem It Solves
- Manual recovery is too slow and unreliable for common, predictable failures.

## Main Diagram
```text
Running System -> Failure Detection -> Healing Policy -> Restart / Replace / Failover -> Verify Recovery
```

## 3 Concrete Examples
1. **Container Restart:** A failed pod is automatically restarted by the orchestrator.
2. **Auto Replacement:** An unhealthy VM is terminated and replaced by an auto scaling group.
3. **Queue Worker Recovery:** A stuck worker is detected and restarted while its message is retried.

## TypeScript Example
```typescript
watch(pods, (pod) => {
  if (pod.restarts > 3) k8s.replace(pod);
  if (!pod.ready) k8s.restart(pod);
});
// Container Restart:
// Self-Healing Systems automatically detect failure and take corrective...
```

## Architecture Questions
- What failures can be detected reliably?
- What automatic action is safe?
- How do we avoid restart loops?
- When should humans be alerted?
- How is state protected during recovery?
- How are recovery actions audited?

## When to Use
- Failures are predictable and recoverable.
- Automatic recovery is safer and faster than manual response.
- State can survive restart or replacement.

## When NOT to Use
- Automatic action could corrupt state.
- Failure detection is unreliable.
- Restart loops hide real incidents.
