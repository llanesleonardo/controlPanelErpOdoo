# Rolling Deployment

## Core Idea
Rolling Deployment replaces instances gradually while keeping the service available.

## Problem It Solves
- A service needs updates without taking all instances offline at once.

## Main Diagram
```text
Old Instance -> Old Instance -> Old Instance -> New Instance -> New Instance
```

## 3 Concrete Examples
1. **Kubernetes Rolling Update:** Pods are replaced one batch at a time.
2. **VM Fleet Upgrade:** A few instances are drained, updated, and returned before moving to the next batch.
3. **API Patch Release:** Load balancer removes old instances while new ones become healthy.

## TypeScript Example
```typescript
async function rollingUpdate(instances: Instance[], newImage: string) {
  for (const inst of instances) {
    await inst.replace(newImage);
    await healthCheck(inst);
  }
}
```

## Architecture Questions
- How many instances can be unavailable during rollout?
- How many new instances can be added above normal capacity?
- Are old and new versions compatible?
- How are health checks defined?
- How is rollback triggered?
- Can in-flight traffic drain safely?

## When to Use
- You need zero or low downtime updates.
- Old and new versions can coexist.
- Health checks can detect bad instances.

## When NOT to Use
- Old and new versions are incompatible.
- Any mixed-version period is unsafe.
- Instances cannot drain gracefully.
