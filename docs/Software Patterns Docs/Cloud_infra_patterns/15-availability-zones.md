# Availability Zones

## Core Idea
Availability Zones are separate failure domains within a region used to improve resilience.

## Problem It Solves
- A single datacenter or zone failure can take down services if all resources run in one place.

## Main Diagram
```text
Load Balancer -> Zone A Instances -> Zone B Instances -> Zone C Instances -> (Multi-AZ Database)
```

## 3 Concrete Examples
1. **Multi-AZ Web Tier:** Application replicas run across at least three zones.
2. **Multi-AZ Database:** Database primary and standby are placed in different zones.
3. **Zone-Aware Load Balancing:** Traffic is routed to healthy instances across zones.

## TypeScript Example
```typescript
const azs = ['az-a', 'az-b', 'az-c'];
const replicas = azs.map(az => deploy({ zone: az, replicas: 2 }));
loadBalancer.route(replicas);
```

## Architecture Questions
- Which resources are spread across zones?
- Can the app survive losing one zone?
- Are databases multi-AZ?
- Is traffic balanced across zones?
- Are dependencies also zone-resilient?
- How is zonal failure tested?

## When to Use
- You need resilience against zone failure.
- The cloud region supports multiple zones.
- Dependencies can be deployed across zones.

## When NOT to Use
- The workload is non-critical and cost-sensitive.
- Dependencies remain single-zone.
- Zonal traffic and failover are not tested.
