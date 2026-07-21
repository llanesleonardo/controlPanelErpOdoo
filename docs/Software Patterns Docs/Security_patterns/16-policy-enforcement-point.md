# Policy Enforcement Point

## Core Idea
A Policy Enforcement Point intercepts requests and enforces access decisions from policy logic before allowing access to resources.

## Problem It Solves
- Authorization rules need to be consistently enforced at system boundaries instead of scattered across application code.

## Main Diagram
```text
Request -> Policy Enforcement Point -> Policy Decision Point -> Protected Resource -> Audit Log
```

## 3 Concrete Examples
1. **API Gateway PEP:** Gateway checks authorization policy before routing to services.
2. **Service Mesh PEP:** Sidecar proxy enforces service-to-service policy.
3. **Application Middleware PEP:** Middleware checks user action permissions before controller logic runs.

## TypeScript Example
```typescript
app.use(async (req, res, next) => {
  const decision = await policyEngine.evaluate(req.user, req.path, req.method);
  if (!decision.allow) return res.status(403).json({ reason: decision.reason });
  next();
});
// API Gateway PEP:
```

## Architecture Questions
- Where should enforcement happen?
- What is the policy decision point?
- What request attributes are needed?
- What happens on deny?
- How are decisions logged?
- Can services bypass the PEP?

## When to Use
- Policy enforcement must be consistent.
- Authorization should happen at clear boundaries.
- Requests can be intercepted before resource access.

## When NOT to Use
- Services can bypass it.
- Policy decisions require data the PEP cannot access.
- Policy is scattered and not centrally governed.
