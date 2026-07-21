# CI/CD Pipeline

## Core Idea
A CI/CD Pipeline automates building, testing, validating, packaging, and deploying software changes.

## Problem It Solves
- Manual builds and deployments are slow, inconsistent, risky, and hard to audit.

## Main Diagram
```text
Code Commit -> Build -> Test -> Security / Quality Scan -> Package Artifact
```

## 3 Concrete Examples
1. **Web Application Pipeline:** A commit triggers linting, unit tests, build, container image creation, security scan, and deployment to staging.
2. **Backend API Pipeline:** Pull requests run tests and contract checks; merged changes deploy automatically through environments.
3. **Desktop App Release Pipeline:** The pipeline builds installers, signs artifacts, runs smoke tests, and publishes release packages.

## TypeScript Example
```typescript
const stages = ['checkout', 'install', 'test', 'build', 'deploy'] as const;
for (const stage of stages) {
  const ok = await runStage(stage);
  if (!ok) throw new Error(`Pipeline failed at ${stage}`);
}
```

## Architecture Questions
- What triggers the pipeline?
- What quality gates must pass before deployment?
- What artifacts are produced?
- How are environments promoted?
- How is rollback handled?
- Who can approve production deployments?

## When to Use
- You need repeatable build, test, and deployment flow.
- Manual releases are risky or slow.
- Quality gates should be automated.

## When NOT to Use
- Tests are unreliable and ignored.
- Deployments require undocumented manual steps.
- Pipeline complexity exceeds product needs.
