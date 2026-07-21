# Team Topologies

## Core Idea
Team Topologies organizes teams around flow of change using team types such as stream-aligned, platform, enabling, and complicated-subsystem teams.

## Problem It Solves
- Teams are organized in ways that create excessive handoffs, unclear ownership, overloaded communication, and slow delivery.

## Main Diagram
```text
Stream-Aligned Team -> Platform Team -> Enabling Team -> Complicated Subsystem Team
```

## 3 Concrete Examples
1. **Stream-Aligned Product Team:** A team owns a customer-facing product stream end-to-end, including delivery and operations.
2. **Platform Team:** A platform team provides self-service deployment, observability, and runtime capabilities.
3. **Enabling Team:** A temporary enabling team helps product teams adopt security, testing, or cloud practices.

## TypeScript Example
```typescript
const topology = {
  streamAligned: ['product-team'],
  platform: ['k8s-team'],
  enabling: ['security-coaches'],
  complicatedSubsystems: ['ml-team'],
};
```

## Architecture Questions
- What are the main streams of value?
- Which teams are stream-aligned?
- What cognitive load is too high for product teams?
- What platform capabilities should be self-service?
- Where are enabling teams needed temporarily?
- Which team interactions should be collaboration, X-as-a-Service, or facilitating?

## When to Use
- Team structure is causing delivery friction.
- Cognitive load is too high.
- You need clearer team interaction modes.

## When NOT to Use
- Team names change but responsibilities do not.
- Leadership will not address cognitive load or dependencies.
- It becomes org-chart theater.
