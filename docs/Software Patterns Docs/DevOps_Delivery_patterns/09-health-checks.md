# Health Checks

## Core Idea
Health Checks expose signals that indicate whether a service instance is alive, ready, and able to serve traffic.

## Problem It Solves
- Load balancers and orchestrators need reliable signals to route traffic and restart broken instances.

## Main Diagram
```text
Orchestrator / Load Balancer -> Health Endpoint -> Service Instance -> Dependencies
```

## 3 Concrete Examples
1. **Liveness Probe:** A container is restarted if it stops responding.
2. **Readiness Probe:** Traffic is sent only after the service has loaded config and connected to dependencies.
3. **Dependency Health Endpoint:** A service reports database or queue connectivity for operational diagnosis.

## TypeScript Example
```typescript
app.get('/health', async (_req, res) => {
  const dbOk = await db.ping();
  const status = dbOk ? 200 : 503;
  res.status(status).json({ status: dbOk ? 'ok' : 'degraded', checks: { db: dbOk } });
});
// Liveness Probe:
```

## Architecture Questions
- What does alive mean?
- What does ready mean?
- Should dependency failures make the service unready?
- How expensive is the health check?
- Can health checks cause cascading failures?
- What should orchestration do on failure?

## When to Use
- Load balancers or orchestrators need service status.
- Instances should be removed or restarted automatically.
- Startup readiness matters.

## When NOT to Use
- Checks are expensive or flaky.
- Health endpoints report healthy while the app is broken.
- Dependency checks cause cascading restarts.
