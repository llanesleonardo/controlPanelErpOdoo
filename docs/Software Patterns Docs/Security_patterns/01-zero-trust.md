# Zero Trust

## Core Idea
Zero Trust assumes no network, device, user, or service is trusted by default, even inside the internal network.

## Problem It Solves
- Traditional perimeter security fails when attackers, compromised devices, or malicious insiders operate inside the network.

## Main Diagram
```text
User / Service / Device -> Identity Provider -> Policy Engine -> Policy Enforcement Point -> Protected Resource
```

## 3 Concrete Examples
1. **Internal API Access:** A backend service must authenticate, authorize, and be policy-checked before calling another internal service.
2. **Employee SaaS Access:** Employees access apps based on identity, device posture, location risk, and session context.
3. **Production Admin Access:** Engineers must use strong identity, device trust, and just-in-time access to reach production systems.

## TypeScript Example
```typescript
app.use(async (req, res, next) => {
  const identity = await verifyToken(req);
  const device = await attestDevice(req);
  if (!identity || !device.trusted) return res.status(403).end();
  next();
});
```

## Architecture Questions
- What identities need access: users, services, devices, workloads?
- What signals decide trust: MFA, device health, location, risk, role, policy?
- Where are policies evaluated and enforced?
- How is least privilege applied?
- How is lateral movement limited?
- How are access decisions logged and audited?

## When to Use
- You need to reduce implicit trust inside networks.
- Users, devices, and workloads require continuous verification.
- Lateral movement risk is a concern.

## When NOT to Use
- You cannot collect reliable identity/context signals.
- Policies are undefined.
- The organization treats Zero Trust as a slogan instead of controls.
