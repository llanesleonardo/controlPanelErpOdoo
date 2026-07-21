# JWT

## Core Idea
JWT is a signed token format that carries claims between parties, commonly used for authentication and authorization context.

## Problem It Solves
- Systems need portable, verifiable claims without querying a central session store on every request.

## Main Diagram
```text
Token Issuer -> Signed JWT Claims -> Client -> API / Verifier -> Public Keys / JWKS
```

## 3 Concrete Examples
1. **Access Token:** An API receives a JWT containing subject, scopes, issuer, audience, and expiration.
2. **ID Token:** An OIDC provider issues a JWT with user identity claims.
3. **Service Token:** A workload presents a signed JWT to call another service.

## TypeScript Example
```typescript
const token = jwt.sign({ sub: user.id, role: user.role }, secret, { expiresIn: '1h' });
const payload = jwt.verify(token, secret) as { sub: string; role: string };
if (payload.role !== 'admin') throw new Error('Forbidden');
```

## Architecture Questions
- Who issues the JWT?
- Who validates it?
- What claims belong inside?
- What signing algorithm and key rotation are used?
- How short should token lifetime be?
- How is revocation handled?

## When to Use
- Portable signed claims are useful.
- APIs can validate tokens without central session lookup.
- Token lifetimes and key rotation are controlled.

## When NOT to Use
- Immediate revocation is required but not designed.
- Tokens are stuffed with sensitive or bloated claims.
- Key rotation and audience validation are ignored.
