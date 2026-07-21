# Edge Computing

## Core Idea
Edge Computing moves computation closer to users, devices, or data sources.

## Problem It Solves
- Centralized processing creates too much latency, bandwidth usage, or dependency on distant regions.

## Main Diagram
```text
User / Device -> Edge Location -> Central Cloud -> (Central Data Store)
```

## 3 Concrete Examples
1. **Edge Authentication:** A lightweight auth check runs at the edge before reaching origin.
2. **IoT Preprocessing:** Sensor gateways filter and aggregate data before sending to cloud.
3. **Personalized Edge Response:** Edge functions customize cached pages based on headers or location.

## TypeScript Example
```typescript
addEventListener('fetch', (event) => {
  const cache = caches.default;
  event.respondWith(cache.match(event.request).then(hit => hit ?? fetch(event.request)));
});
// Edge Authentication:
// Edge Computing moves computation closer to users, devices, or data so...
```

## Architecture Questions
- What computation benefits from being closer to the user or device?
- What data is available at the edge?
- What state is needed?
- How are edge functions deployed and versioned?
- What latency improvement is required?
- What must still run centrally?

## When to Use
- Low latency matters.
- Data can be processed near users/devices.
- Bandwidth reduction or local decisions are valuable.

## When NOT to Use
- Central processing is fast enough.
- The edge lacks needed data.
- Debugging and deployment complexity outweigh latency gains.
