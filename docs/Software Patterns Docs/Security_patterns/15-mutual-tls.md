# Mutual TLS

## Core Idea
Mutual TLS authenticates both client and server using certificates while encrypting the connection.

## Problem It Solves
- Services need strong service-to-service authentication, not just encrypted transport.

## Main Diagram
```text
Client
  |
Mutual TLS
  |
Implementation
```

## 3 Concrete Examples
1. **Service-to-Service Auth:** Order service and Payment service verify each other's certificates.
2. **Partner API Access:** A partner system must present a client certificate to call APIs.
3. **Internal Mesh Security:** A service mesh uses mTLS for every internal request.

## TypeScript Example
```typescript
const agent = new https.Agent({
  cert: fs.readFileSync('client.crt'),
  key: fs.readFileSync('client.key'),
  ca: fs.readFileSync('ca.crt'),
});
fetch('https://api.internal/secure', { agent });
```

## Architecture Questions
- Who issues certificates?
- How are certificate identities mapped to services?
- How are certificates rotated?
- How is trust anchored?
- What happens on certificate expiry?
- Is mTLS enough, or is application authorization still needed?

## When to Use
- Both sides of a connection must authenticate.
- Service-to-service identity matters.
- Encrypted transport alone is insufficient.

## When NOT to Use
- Certificate lifecycle cannot be managed.
- Application authorization is ignored because mTLS exists.
- Only server authentication is needed.
