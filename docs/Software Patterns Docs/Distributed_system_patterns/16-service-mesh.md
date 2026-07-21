# Service Mesh

## Core Idea
A Service Mesh moves network concerns such as mTLS, retries, routing, telemetry, and policy enforcement into infrastructure proxies.

## Problem It Solves
- Microservices need consistent service-to-service traffic management, security, and observability without duplicating that code in every service.

## Main Diagram
```text
Service A -> Proxy A -> Proxy B -> Service B -> Mesh Control Plane
```

## 3 Concrete Examples
1. **mTLS Between Services:** All service-to-service traffic is encrypted and authenticated by mesh proxies.
2. **Traffic Splitting:** 5% of traffic is routed to a canary version.
3. **Uniform Telemetry:** Every service call produces standardized metrics and traces.

## TypeScript Example
```typescript
mesh.configure('payments', {
  trafficPolicy: { retries: 3, timeout: '2s' },
  security: { mtls: 'STRICT' },
});
// mTLS Between Services:
// A Service Mesh moves network concerns such as mTLS, retries, routing,...
```

## Architecture Questions
- Do we have enough services to justify a mesh?
- What traffic policies are needed?
- Will sidecar or ambient mode be used?
- How will certificates and identity work?
- Can the team operate the mesh reliably?
- Will the mesh obscure debugging?

## When to Use
- You have many services with shared traffic/security needs.
- You need mTLS, traffic policy, and observability consistently.
- Platform teams can operate the mesh.

## When NOT to Use
- You only have a few services.
- The team is not ready for mesh complexity.
- A gateway or library solves the actual problem.
