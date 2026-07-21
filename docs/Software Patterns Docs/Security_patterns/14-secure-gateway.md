# Secure Gateway

## Core Idea
Secure Gateway centralizes secure ingress or egress controls such as authentication, TLS termination, inspection, policy enforcement, and routing.

## Problem It Solves
- Traffic entering or leaving a system needs consistent security controls before reaching internal services.

## Main Diagram
```text
Client / External System -> Secure Gateway -> WAF / Inspection -> Auth / Policy -> Internal Service
```

## 3 Concrete Examples
1. **API Ingress Gateway:** External API requests pass through authentication, WAF, TLS, and policy checks.
2. **Egress Gateway:** Outbound calls to the internet are inspected and restricted through a controlled gateway.
3. **Partner Gateway:** Partner traffic is authenticated, logged, and routed through a dedicated gateway.

## TypeScript Example
```typescript
gateway.use(rateLimit, waf, oauth);
gateway.route('/payments', { target: paymentsSvc, mtls: true });
const response = await gateway.forward(inboundRequest);
// single ingress enforces auth, WAF, and mTLS before backend
return response;
audit.log({ gateway: 'secure-ingress', path: inboundRequest.path });
```

## Architecture Questions
- Is this ingress, egress, or partner traffic?
- What security controls happen at the gateway?
- What traffic is blocked?
- What identity is forwarded downstream?
- How are policies updated?
- Can the gateway become a bottleneck or single point of failure?

## When to Use
- Ingress or egress traffic needs centralized controls.
- Internal services should not be directly exposed.
- Inspection, auth, routing, and policy belong at a boundary.

## When NOT to Use
- It only forwards traffic without meaningful controls.
- It becomes a bottleneck or single point of failure.
- Security logic hides core authorization responsibilities.
