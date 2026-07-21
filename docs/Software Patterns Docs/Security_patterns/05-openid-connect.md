# OpenID Connect

## Core Idea
OpenID Connect adds identity authentication on top of OAuth2 using ID tokens.

## Problem It Solves
- Applications need to know who the user is, not just whether the client has access to an API.

## Main Diagram
```text
Client
  |
OpenID Connect
  |
Implementation
```

## 3 Concrete Examples
1. **Single Sign-On:** A web app logs users in through an identity provider and receives an ID token.
2. **Mobile Login:** A mobile app authenticates the user and receives identity claims.
3. **Enterprise App Access:** Internal apps rely on OIDC for standardized user authentication.

## TypeScript Example
```typescript
const claims = await verifyIdToken(idToken, { audience: clientId, issuer });
const session = { userId: claims.sub, email: claims.email as string };
req.session.user = session;
```

## Architecture Questions
- Which identity provider is trusted?
- Which claims are required?
- How are ID tokens validated?
- How are sessions managed?
- What is the difference between ID token and access token?
- How is logout handled?

## When to Use
- Applications need standardized user authentication.
- SSO is needed.
- Identity claims should come from a trusted provider.

## When NOT to Use
- You do not need user authentication.
- The identity provider cannot be trusted or integrated.
- ID token validation is not understood.
