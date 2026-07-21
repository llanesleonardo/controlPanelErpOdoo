# Data Locality

## Core Idea
Data Locality places computation close to the data it needs to reduce latency, bandwidth, and cross-region/cross-node traffic.

## Problem It Solves
- Moving large data across networks is slower and more expensive than processing near where the data already lives.

## Main Diagram
```text
Request Router -> Region A Compute -> (Region A Data) -> Region B Compute -> (Region B Data)
```

## 3 Concrete Examples
1. **Regional Processing:** EU user requests are served in the EU region where their data resides.
2. **MapReduce-Style Processing:** Workers process data blocks on or near the nodes where blocks are stored.
3. **Edge Data Processing:** IoT gateways aggregate data locally before sending summaries to the cloud.

## TypeScript Example
```typescript
function route(request: Request) {
  const region = request.headers['x-region'];
  return datacenters[region] ?? nearestDatacenter(request.geo);
}
// Regional Processing:
route();
```

## Architecture Questions
- Where does the data live?
- Where does computation run?
- How expensive is moving data?
- Can requests be routed to the data's location?
- Does locality conflict with availability?
- How are data movement and replication managed?

## When to Use
- Data movement is expensive.
- Latency matters.
- Requests or compute can be routed near relevant data.

## When NOT to Use
- Data must be globally consistent immediately.
- Routing to data location is impossible.
- Replication/movement costs exceed locality benefits.
