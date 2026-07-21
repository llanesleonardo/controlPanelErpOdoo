# Elastic Scaling

## Core Idea
Elastic Scaling automatically adds or removes capacity based on demand.

## Problem It Solves
- Static capacity either wastes money during low traffic or fails during high traffic.

## Main Diagram
```text
Incoming Load -> Service Fleet -> Metrics -> Scaling Policy -> Auto Scaler
```

## 3 Concrete Examples
1. **CPU-Based API Scaling:** API replicas increase when CPU stays high and decrease when load drops.
2. **Queue-Depth Worker Scaling:** Worker count grows when message backlog increases.
3. **Scheduled Capacity:** Capacity increases before predictable daily traffic peaks.

## TypeScript Example
```typescript
autoscaler.on('metrics', m => {
  if (m.cpu > 75) k8s.scale('api', m.replicas + 1);
  if (m.cpu < 25) k8s.scale('api', Math.max(2, m.replicas - 1));
});
// CPU-Based API Scaling:
// Elastic Scaling automatically adds or removes capacity based on demand.
```

## Architecture Questions
- What metric best represents demand?
- How fast can new capacity start?
- What prevents scale flapping?
- What is the minimum and maximum capacity?
- Can downstream systems scale too?
- What is the cost impact?

## When to Use
- Load changes over time.
- Metrics can drive scaling safely.
- Capacity can be added and removed automatically.

## When NOT to Use
- Startup time is too slow for spikes.
- Metrics do not reflect demand.
- Downstream dependencies cannot scale too.
