# Sidecar

## Core Idea
Sidecar runs a companion process/container next to the main application to provide auxiliary capabilities.

## Problem It Solves
- Cross-cutting operational behavior should not be embedded inside every application service.

## Main Diagram
```text
Pod / Deployment Unit -> Application Container -> Sidecar Container -> Platform Service
```

## 3 Concrete Examples
1. **Log Forwarder Sidecar:** A sidecar tails app logs and sends them to a logging platform.
2. **Proxy Sidecar:** A sidecar handles mTLS, retries, and telemetry for service calls.
3. **Config Watcher:** A sidecar watches configuration changes and updates local files.

## TypeScript Example
```typescript
// Pod: app container + logging sidecar shares volume
const pod = {
  containers: [
    { name: 'api', image: 'api:latest' },
    { name: 'log-shipper', image: 'fluent-bit', mounts: ['/var/log'] },
  ],
};
```

## Architecture Questions
- What operational concern should be externalized?
- How does the app communicate with the sidecar?
- What happens if the sidecar fails?
- Should every service use the same sidecar?
- Does the sidecar add latency?
- Who owns sidecar configuration?

## When to Use
- Cross-cutting operational logic should sit next to the app.
- A companion process can handle logging, proxying, config, or security.
- You want consistency across services.

## When NOT to Use
- A library or platform feature is simpler.
- The sidecar adds more failure points than value.
- Business logic starts moving into the sidecar.
