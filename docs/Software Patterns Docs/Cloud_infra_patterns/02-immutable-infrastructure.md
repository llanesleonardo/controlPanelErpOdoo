# Immutable Infrastructure

## Core Idea
Immutable Infrastructure replaces servers or containers instead of modifying them in place.

## Problem It Solves
- Long-lived servers drift over time, making deployments, debugging, rollback, and reproducibility painful.

## Main Diagram
```text
Build Image -> Versioned Immutable Artifact -> Deploy New Instances -> Old Instances -> New Instances
```

## 3 Concrete Examples
1. **Golden VM Image:** A new machine image is built for each release and old instances are replaced.
2. **Container Deployment:** A new container image is deployed instead of patching a running container.
3. **Auto Scaling Group Refresh:** Instances are terminated and recreated from a new launch template.

## TypeScript Example
```typescript
// Never patch running servers — replace entire image
const deployment = {
  image: 'api:v1.2.3',
  replace: (newImage: string) => ({ ...deployment, image: newImage, instances: rollout(newImage) }),
};
// Golden VM Image:
```

## Architecture Questions
- Can infrastructure be rebuilt from source/configuration?
- Are servers being patched manually?
- How are images versioned?
- How is rollback performed?
- Where is persistent data stored?
- How do we prove production matches the declared artifact?

## When to Use
- You need reproducible environments.
- Manual server drift is a problem.
- Rollback should replace artifacts, not patch machines.

## When NOT to Use
- The environment cannot be rebuilt automatically.
- Persistent local mutation is required.
- Build/release automation is not ready.
