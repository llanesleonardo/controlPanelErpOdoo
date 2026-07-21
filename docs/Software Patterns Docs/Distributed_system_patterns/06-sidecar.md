# Sidecar

## Core Idea
A sidecar is a companion process deployed alongside an application service. It provides auxiliary functionality while the main service focuses on business logic.

## Problem It Solves
- A service needs supporting capabilities like logging, proxying, configuration, or security without embedding that logic into the service itself.

## Main Diagram
```text
Deployment Unit / Pod -> Main Application Container -> Sidecar Container -> Log Platform -> Network / Mesh
```

## 3 Concrete Examples
1. **Logging Sidecar:** A sidecar collects and forwards logs from the main container.
2. **Service Mesh Proxy:** An Envoy-like sidecar handles mTLS, retries, and telemetry.
3. **Configuration Sidecar:** A sidecar watches config changes and updates local files used by the app.

## TypeScript Example
```typescript
const sidecar = { log: (r: Request) => shipToCollector(r), encrypt: (b: Buffer) => tls.wrap(b) };
app.use((req, _res, next) => { sidecar.log(req); next(); });
```

## Architecture Questions
- What cross-cutting capability should be externalized?
- Should every service get the same sidecar?
- How will the sidecar and app communicate?
- What happens if the sidecar fails?
- Does the sidecar add latency or operational complexity?
- Who owns the sidecar configuration?

## When to Use
- A supporting concern should be deployed next to the app.
- You want consistent infrastructure behavior across services.
- The app should not embed platform-specific logic.

## When NOT to Use
- The sidecar is more complex than the app.
- A library or platform feature is simpler.
- The failure relationship between app and sidecar is unclear.
