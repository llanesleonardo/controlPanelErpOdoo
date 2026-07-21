# Auto Scaling

## Core Idea
Auto Scaling automatically adjusts capacity based on demand, schedules, or metrics.

## Problem It Solves
- Fixed capacity either wastes money during low demand or fails during high demand.

## Main Diagram
```text
Metrics -> Scaling Policy -> Auto Scaling Controller -> Service Instances -> Incoming Load
```

## 3 Concrete Examples
1. **CPU-Based Scaling:** Add more service replicas when CPU stays above 70%.
2. **Queue-Based Scaling:** Add workers when queue depth or message age grows.
3. **Scheduled Scaling:** Increase capacity before daily business-hour traffic starts.

## TypeScript Example
```typescript
function evaluate(metrics: Metrics) {
  if (metrics.cpu > 70) return { action: 'scale-out', desired: metrics.instances + 2 };
  if (metrics.cpu < 30) return { action: 'scale-in', desired: Math.max(1, metrics.instances - 1) };
  return { action: 'noop', desired: metrics.instances };
}
// CPU-Based Scaling:
```

## Architecture Questions
- What metric best represents demand?
- What is the scale-out threshold?
- What is the scale-in threshold?
- How fast can new capacity become ready?
- What prevents flapping?
- Are downstream dependencies also scalable?

## When to Use
- Load changes over time.
- Capacity should match demand.
- Metrics can reliably trigger scaling decisions.

## When NOT to Use
- Metrics do not reflect demand.
- Startup time is too slow for traffic spikes.
- Downstream dependencies cannot scale too.
