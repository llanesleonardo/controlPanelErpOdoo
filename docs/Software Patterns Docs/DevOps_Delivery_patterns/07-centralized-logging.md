# Centralized Logging

## Core Idea
Centralized Logging collects logs from many services and systems into one searchable platform.

## Problem It Solves
- Logs scattered across servers, containers, and services make debugging slow and incomplete.

## Main Diagram
```text
Service A -> Service B -> Service C -> Log Agent / Collector -> (Central Log Store)
```

## 3 Concrete Examples
1. **Microservice Logs:** All service logs are shipped to one logging platform with service, environment, and trace IDs.
2. **Security Audit Logs:** Authentication and admin actions are centralized for investigation.
3. **Kubernetes Logs:** Pod logs are collected by agents and indexed centrally.

## TypeScript Example
```typescript
logger.info({ service: 'orders', traceId, orderId: 'O-42', msg: 'created' });
// shipped to ELK/Datadog — query all services by traceId
```

## Architecture Questions
- What systems produce logs?
- What fields should every log include?
- How are correlation IDs propagated?
- How long are logs retained?
- How is sensitive data redacted?
- What alerts are based on logs?

## When to Use
- Many systems produce logs.
- Debugging requires searching across services.
- Audit and retention are needed.

## When NOT to Use
- Sensitive data cannot be protected.
- Log volume cost is uncontrolled.
- Logs are unstructured and impossible to query.
