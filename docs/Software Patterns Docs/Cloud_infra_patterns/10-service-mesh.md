# Service Mesh

## Core Idea
Service Mesh provides infrastructure-level service-to-service traffic management, security, and observability.

## Problem It Solves
- Microservices need consistent mTLS, retries, routing, metrics, and policy without duplicating code in every service.

## Main Diagram
```text
Service A -> Proxy A -> Proxy B -> Service B -> Mesh Control Plane
```

## 3 Concrete Examples
1. **mTLS Everywhere:** All internal service calls are encrypted and authenticated by mesh proxies.
2. **Canary Traffic Split:** The mesh routes 10% of service traffic to a new version.
3. **Unified Telemetry:** Every service call emits standard latency, error, and trace data.

## TypeScript Example
```typescript
mesh.configure('payments', { trafficPolicy: { retries: 3, timeout: '2s' }, security: { mtls: 'STRICT' } });
const response = await mesh.call('payments', '/charge', { amount: 99 });
```

## Architecture Questions
- Do we have enough services to justify a mesh?
- What traffic policies are needed?
- How will identity and certificates be managed?
- Will sidecars or ambient mode be used?
- Can the team operate the mesh?
- How will debugging work through proxies?

## When to Use
- You have many services needing uniform mTLS, telemetry, and traffic policy.
- Platform teams can operate mesh infrastructure.
- Service-to-service behavior should be centrally managed.

## When NOT to Use
- You only have a few services.
- The team cannot operate the mesh.
- A gateway or client library solves the real problem.
