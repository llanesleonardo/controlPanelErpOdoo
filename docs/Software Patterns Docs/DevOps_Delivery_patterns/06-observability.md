# Observability

## Core Idea
Observability makes system behavior understandable from external signals such as logs, metrics, traces, events, and profiles.

## Problem It Solves
- Teams cannot diagnose production issues if they cannot see what the system is doing and why.

## Main Diagram
```text
Application -> Logs -> Metrics -> Traces -> Events
```

## 3 Concrete Examples
1. **API Latency Diagnosis:** Metrics show latency spike, traces identify slow dependency, logs show error details.
2. **Queue Backlog Investigation:** Queue depth metrics and worker logs reveal a stuck consumer.
3. **Release Monitoring:** Dashboards compare error rate, latency, and saturation before and after deployment.

## TypeScript Example
```typescript
const span = tracer.startSpan('placeOrder');
try { await orderSvc.create(dto); span.setStatus({ code: 'OK' }); }
catch (e) { span.recordException(e); throw e; }
finally { span.end(); }
// API Latency Diagnosis:
// Observability makes system behavior understandable from external sign...
```

## Architecture Questions
- What questions must operators answer during incidents?
- What metrics represent health?
- What logs contain useful context?
- Where are traces needed?
- How are signals correlated?
- What alerts indicate user impact?

## When to Use
- Production behavior must be diagnosable.
- Incidents require fast root-cause analysis.
- Teams need logs, metrics, and traces correlated.

## When NOT to Use
- Signals are collected but never used.
- Logs/metrics/traces contain no useful context.
- No one owns dashboards or alerts.
