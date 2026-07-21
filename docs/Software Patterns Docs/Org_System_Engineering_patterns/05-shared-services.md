# Shared Services

## Core Idea
Shared Services centralize common capabilities used by multiple teams or systems.

## Problem It Solves
- Multiple teams repeatedly build duplicate capabilities such as identity, billing, notifications, search, or reporting.

## Main Diagram
```text
Shared Service -> Team A System -> Team B System -> Team C System -> (Shared Service Data)
```

## 3 Concrete Examples
1. **Identity Service:** All applications use a shared identity and access service instead of implementing login separately.
2. **Notification Service:** Teams call one shared service for email, SMS, push, and delivery tracking.
3. **Billing Service:** Product teams use shared billing APIs for invoices, subscriptions, and payment records.

## TypeScript Example
```typescript
const shared = { auth: identitySvc, logging: logSvc };
orders.init({ auth: shared.auth, log: shared.logging });
billing.init({ auth: shared.auth, log: shared.logging });
```

## Architecture Questions
- What capability is genuinely shared?
- Who owns the shared service?
- What contract does it expose?
- How are teams prevented from being blocked by it?
- What SLAs and support model exist?
- Is this shared service becoming a bottleneck or god service?

## When to Use
- A common capability is duplicated across teams.
- Central ownership and SLAs are possible.
- The service can expose a stable contract.

## When NOT to Use
- The shared capability changes differently for each consumer.
- No team owns service quality.
- It becomes a bottleneck or god service.
