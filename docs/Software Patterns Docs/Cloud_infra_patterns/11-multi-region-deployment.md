# Multi-Region Deployment

## Core Idea
Multi-Region Deployment runs application infrastructure in more than one geographic/cloud region.

## Problem It Solves
- A single region failure, high latency, or regional compliance requirement can make one-region architecture insufficient.

## Main Diagram
```text
Global Users -> Global DNS / Traffic Manager -> Region A -> Region B -> (DB Region A)
```

## 3 Concrete Examples
1. **Active-Passive DR:** A standby region is ready for failover if the primary region fails.
2. **Active-Active Global App:** Users are routed to the nearest healthy region.
3. **Regional Data Residency:** EU users are served from an EU region while US users are served from a US region.

## TypeScript Example
```typescript
const regions = ['us-east-1', 'eu-west-1', 'ap-south-1'];
function route(user: User) {
  const nearest = geo.nearest(user.lat, user.lng, regions);
  return endpoints[nearest];
}
// Active-Passive DR:
```

## Architecture Questions
- Is the goal latency, disaster recovery, or compliance?
- Is the design active-active or active-passive?
- How is data replicated?
- How is failover triggered?
- Can the app tolerate split-brain or stale data?
- How is traffic routed globally?

## When to Use
- Regional failure resilience is required.
- Global latency matters.
- Data residency or regional compliance matters.

## When NOT to Use
- Single-region availability is acceptable.
- Data replication complexity is not justified.
- The app cannot handle regional consistency issues.
