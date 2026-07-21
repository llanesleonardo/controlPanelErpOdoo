# DMZ

## Core Idea
A DMZ is a network segment that exposes public-facing services while separating them from private internal systems.

## Problem It Solves
- Internet-facing systems need exposure, but compromise of those systems should not directly expose the internal network.

## Main Diagram
```text
Internet -> External Firewall -> DMZ Services -> Internal Firewall -> Internal Network
```

## 3 Concrete Examples
1. **Public Web Tier:** Web servers run in the DMZ and call internal app services through restricted rules.
2. **Email Gateway:** Mail gateways sit in the DMZ before forwarding to internal mail systems.
3. **Partner File Transfer:** SFTP servers are placed in a DMZ away from core databases.

## TypeScript Example
```typescript
// Public DMZ hosts reverse proxy; app tier in private network
const nginxDMZ = { proxy: (path: string, target: string) => ({ path, upstream: target }) };
nginxDMZ.proxy('/api', 'http://internal-api:8080');
// only DMZ subnet accepts inbound traffic from the internet
const appTier = 'http://internal-api:8080'; // private — not routable publicly
// Public Web Tier:
```

## Architecture Questions
- Which systems must be publicly reachable?
- What traffic is allowed from internet to DMZ?
- What traffic is allowed from DMZ to internal network?
- How are DMZ hosts monitored and patched?
- What happens if a DMZ host is compromised?
- Are secrets and databases kept out of the DMZ?

## When to Use
- Public-facing systems must be separated from internal systems.
- Network segmentation reduces blast radius.
- Internet ingress needs controlled exposure.

## When NOT to Use
- Network segmentation is fake because DMZ can freely reach everything.
- Workloads are cloud-native and identity-based controls fit better.
- Secrets or databases are placed in the DMZ.
