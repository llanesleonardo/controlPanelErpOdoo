# Platform Teams

## Core Idea
Platform Teams build internal products that help stream-aligned teams deliver faster and safer through self-service capabilities.

## Problem It Solves
- Product teams waste time repeatedly solving infrastructure, deployment, observability, security, and operational problems.

## Main Diagram
```text
Platform Team -> Developer Portal / Golden Paths -> CI/CD -> Observability -> Security Baselines
```

## 3 Concrete Examples
1. **Deployment Platform:** Platform team provides standardized CI/CD templates, environment creation, and rollback tools.
2. **Observability Platform:** Platform team provides logging, metrics, tracing, alerting, and dashboards as a supported service.
3. **Developer Portal:** Platform team offers service scaffolding, documentation, ownership metadata, and golden paths.

## TypeScript Example
```typescript
const platform = {
  deploy: (svc: string) => ci.deploy(svc),
  observe: (svc: string) => grafana.dashboard(svc),
};
await platform.deploy('orders-api');
await platform.observe('orders-api');
```

## Architecture Questions
- What repeated friction do product teams face?
- What should become self-service?
- Who are the platform's users?
- What APIs, templates, or portals should the platform expose?
- How is platform adoption measured?
- Is the platform helping teams or becoming a bottleneck?

## When to Use
- Product teams repeatedly solve the same infrastructure problems.
- Self-service internal platforms would improve flow.
- There is enough demand to justify platform ownership.

## When NOT to Use
- The platform is forced instead of solving team pain.
- The platform team becomes a ticket queue.
- There are too few product teams to justify it.
