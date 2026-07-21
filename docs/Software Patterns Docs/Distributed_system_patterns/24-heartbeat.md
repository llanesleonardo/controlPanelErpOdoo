# Heartbeat

## Core Idea
Heartbeat sends periodic signals from one component to another. Missing heartbeats indicate possible failure.

## Problem It Solves
- Distributed nodes need to detect whether other nodes are alive or failed.

## Main Diagram
```text
Client
  |
Heartbeat
  |
Implementation
```

## 3 Concrete Examples
1. **Worker Health:** Workers send heartbeats to a coordinator.
2. **Cluster Membership:** Nodes monitor each other for liveness.
3. **IoT Device Monitoring:** Devices periodically report they are online.

## TypeScript Example
```typescript
setInterval(async () => {
  await registry.heartbeat(serviceId, { status: 'alive', ts: Date.now() });
}, 5000);
```

## Architecture Questions
- Who sends heartbeats to whom?
- What interval is used?
- How many missed heartbeats indicate failure?
- What false positives are acceptable?
- What recovery action happens after failure detection?
- How are network partitions handled?

## When to Use
- Liveness detection is needed.
- Nodes or devices can disappear.
- A coordinator or peers need failure signals.

## When NOT to Use
- Failure detection must be perfectly accurate.
- Network delays make false positives unacceptable.
- Passive health checks are enough.
