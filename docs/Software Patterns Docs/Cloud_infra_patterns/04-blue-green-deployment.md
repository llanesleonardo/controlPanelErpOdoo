# Blue-Green Deployment

## Core Idea
Blue-Green Deployment keeps two production-like environments and switches traffic from the old version to the new version.

## Problem It Solves
- Deployments need fast cutover and fast rollback with minimal downtime.

## Main Diagram
```text
Client -> Router / Load Balancer -> Blue Environment - Current -> Green Environment - New -> (Database)
```

## 3 Concrete Examples
1. **Web App Release:** Blue runs current production while Green is deployed and tested before traffic switches.
2. **API Upgrade:** Traffic is moved from v1 environment to v2 environment after smoke tests.
3. **Database-Compatible Release:** A new app stack is prepared while the old one keeps serving traffic.

## TypeScript Example
```typescript
const blue = { version: 'v1', traffic: 0 };
const green = { version: 'v2', traffic: 100 };
function switchTraffic() {
  blue.traffic = 100; green.traffic = 0; // instant cutover after green is verified
}
// Web App Release:
```

## Architecture Questions
- Can we afford two production environments?
- How is traffic switched?
- How is rollback performed?
- Are database migrations backward compatible?
- How is Green validated before cutover?
- What happens to in-flight requests?

## When to Use
- You need fast rollback.
- Two environments are affordable.
- Database changes are backward compatible.

## When NOT to Use
- Two full environments are too expensive.
- Database migrations are not compatible.
- Traffic cutover cannot be controlled safely.
