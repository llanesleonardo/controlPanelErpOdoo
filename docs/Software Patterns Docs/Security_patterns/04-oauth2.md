# OAuth2

## Core Idea
OAuth2 is an authorization framework that lets a client obtain limited access to protected resources using access tokens.

## Problem It Solves
- Applications need delegated access without sharing user passwords with every client application.

## Main Diagram
```text
Client
  |
OAuth2
  |
Implementation
```

## 3 Concrete Examples
1. **Third-Party Calendar App:** A calendar app gets permission to read events without knowing the user's password.
2. **Mobile App API Access:** A mobile app obtains an access token to call backend APIs.
3. **Machine-to-Machine Access:** A service uses client credentials to call another API.

## TypeScript Example
```typescript
const authUrl = `${issuer}/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=calendar.read`;
const { code } = await getCallbackCode(authUrl);
const { access_token } = await exchangeCodeForToken(code);
const events = await fetch('https://calendar/api/events', {
  headers: { Authorization: `Bearer ${access_token}` },
});
```

## Architecture Questions
- Which OAuth2 flow is appropriate?
- Who is the resource owner?
- What scopes are needed?
- How long should access tokens live?
- Are refresh tokens required?
- How are tokens validated and revoked?

## When to Use
- A client needs delegated API access.
- Users should not share passwords with clients.
- Scopes and access tokens fit the problem.

## When NOT to Use
- You only need local username/password login.
- The team confuses OAuth2 authorization with authentication.
- Token storage and validation are not designed.
