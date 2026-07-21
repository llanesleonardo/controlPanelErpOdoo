# Infrastructure as Code

## Core Idea
Infrastructure as Code defines infrastructure in versioned, reviewable, repeatable code instead of manual configuration.

## Problem It Solves
- Manual infrastructure changes create drift, inconsistency, weak auditability, and unreliable recovery.

## Main Diagram
```text
IaC Code -> Plan -> Review -> Apply -> Cloud Resources
```

## 3 Concrete Examples
1. **Terraform Environment:** Networks, databases, load balancers, and IAM are declared in Terraform modules.
2. **Kubernetes Manifests:** Deployments, services, and config are defined as YAML and applied by automation.
3. **Cloud Landing Zone:** Accounts, policies, networking, and security baselines are created from code.

## TypeScript Example
```typescript
import * as aws from '@pulumi/aws';
const bucket = new aws.s3.Bucket('app-logs', { versioning: { enabled: true } });
export const bucketName = bucket.id;
```

## Architecture Questions
- What resources are managed as code?
- How is state managed?
- How are secrets handled?
- How are changes reviewed and approved?
- How is drift detected?
- How are modules versioned?

## When to Use
- Infrastructure must be reproducible.
- Audit and review are required.
- Manual drift is a problem.

## When NOT to Use
- Resources are experimental and throwaway.
- State management and secrets are not understood.
- Everyone will still change infrastructure manually.
