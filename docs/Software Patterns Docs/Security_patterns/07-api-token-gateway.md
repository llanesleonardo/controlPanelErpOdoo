# API Token Gateway

## Core Idea
API Token Gateway validates, exchanges, scopes, or enriches tokens before requests reach backend APIs.

## Problem It Solves
- Backend services should not all implement inconsistent token validation, token exchange, and API access policy.

## Main Diagram
```text
Client -> API Token Gateway -> Token Validation / Exchange -> Backend API -> Access Policy
```

## 3 Concrete Examples
1. **Partner API Gateway:** The gateway validates partner API tokens and forwards authenticated context to services.
2. **Token Exchange:** The gateway exchanges an external token for an internal service token.
3. **Central Scope Enforcement:** The gateway blocks requests missing required scopes before they hit backend APIs.

## TypeScript Example
```typescript
app.use('/api', (req, res, next) => {
  const token = req.headers['x-api-key'];
  if (!tokens.validate(token)) return res.status(401).end();
  req.scopes = tokens.scopes(token);
  next();
});
```

## Architecture Questions
- What token types are accepted?
- Does the gateway validate, exchange, or mint tokens?
- What context is forwarded downstream?
- Are backend services still responsible for authorization?
- How are tokens revoked or rotated?
- Can the gateway become a single security bottleneck?

## When to Use
- Token handling should be centralized at the API edge.
- Multiple backend services need consistent token validation.
- Token exchange or scope enforcement is needed.

## When NOT to Use
- Backend services need resource-specific authorization anyway and gateway checks are superficial.
- The gateway becomes a god security layer.
- Token logic is simple and already consistent.
