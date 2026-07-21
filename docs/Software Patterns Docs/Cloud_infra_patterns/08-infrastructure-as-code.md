# Infrastructure as Code

## Core Idea
Infrastructure as Code defines infrastructure using versioned, reviewable, repeatable code.

## Problem It Solves
- Manually configured infrastructure is hard to reproduce, audit, review, and recover.

## Main Diagram
```text
IaC Code -> Pull Request / Review -> Plan -> Apply -> Cloud Infrastructure
```

## 3 Concrete Examples
1. **Terraform Cloud Network:** VPCs, subnets, load balancers, and databases are declared in Terraform.
2. **Kubernetes Manifests:** Deployments, services, and config are defined in YAML and versioned.
3. **Policy-Controlled Environments:** Dev, staging, and production are created from reusable IaC modules.

## TypeScript Example
```typescript
const cluster = new K8sCluster('prod', { nodes: 3, region: 'us-east-1' });
new Deployment('api', { image: 'api:1.0', replicas: 3, cluster });
```

## Architecture Questions
- What infrastructure should be declared as code?
- How are modules versioned?
- How are secrets handled?
- How are changes reviewed?
- How is drift detected?
- How are environments promoted?

## When to Use
- Infrastructure must be reproducible and reviewable.
- Multiple environments need consistency.
- Manual changes are causing drift.

## When NOT to Use
- The team will bypass code with manual console changes.
- Secrets and state are not managed properly.
- A tiny throwaway environment does not justify the overhead.
