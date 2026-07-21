# Heartbeat

## Core Idea
Heartbeat sends periodic liveness signals so other components can detect failure or disconnection.

## Problem It Solves
- Distributed components need to know whether peers, workers, or devices are still alive.

## Main Diagram
```text
Client
  |
Heartbeat
  |
Implementation
```

## 3 Concrete Examples
1. **Worker Liveness:** Workers send heartbeats to a coordinator while processing jobs.
2. **Cluster Membership:** Nodes monitor heartbeats to detect failed members.
3. **IoT Device Monitoring:** Devices send periodic heartbeats to show they are online.

## TypeScript Example
```typescript
setInterval(() => ws.send(JSON.stringify({ type: 'ping', ts: Date.now() })), 3000);
ws.on('message', (m) => { if (JSON.parse(String(m)).type === 'pong') lastSeen = Date.now(); });
```

## Architecture Questions
- Who sends heartbeats?
- Who receives them?
- What interval is used?
- How many missed heartbeats indicate failure?
- How are false positives handled?
- What recovery action follows missed heartbeats?

## When to Use
- Liveness detection is needed.
- Nodes, workers, or devices can disappear.
- Missed heartbeat actions are defined.

## When NOT to Use
- Network delays make false failure detection unacceptable.
- Liveness does not prove usefulness.
- No recovery action follows missing heartbeat.
