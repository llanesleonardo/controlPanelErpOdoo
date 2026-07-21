# GitOps

## Core Idea
GitOps uses Git as the source of truth for desired system state, with automated controllers reconciling runtime infrastructure to match Git.

## Problem It Solves
- Infrastructure and deployment changes become inconsistent when applied manually outside version control.

## Main Diagram
```text
Developer -> Git Desired State -> GitOps Controller -> Runtime Environment -> Drift Detection
```

## 3 Concrete Examples
1. **Kubernetes Deployment:** Changing a manifest in Git causes a GitOps controller to update the cluster.
2. **Environment Promotion:** A pull request changes the image tag in staging or production config.
3. **Drift Correction:** Manual changes in the cluster are reverted because they do not match Git.

## TypeScript Example
```typescript
// Desired state in git; controller reconciles cluster
const desired = yaml.parse(fs.readFileSync('k8s/deployment.yaml'));
const actual = await k8s.get('Deployment', 'api');
if (!deepEqual(desired, actual)) await k8s.apply(desired);
// Kubernetes Deployment:
// GitOps uses Git as the source of truth for desired system state, with...
```

## Architecture Questions
- What repository contains desired state?
- What controller reconciles state?
- How are secrets handled?
- How are environment promotions reviewed?
- How is drift detected?
- Who can merge changes to production?

## When to Use
- Runtime desired state can be represented declaratively.
- Git review should control infrastructure/deployment changes.
- Drift detection and reconciliation are valuable.

## When NOT to Use
- Runtime state cannot be declared cleanly.
- Teams bypass Git for urgent changes.
- Secrets and environment promotion are not designed.
