# Bastion Host

## Core Idea
A Bastion Host is a hardened jump point used to access private systems from a controlled entry point.

## Problem It Solves
- Private servers should not be directly exposed to the internet or broad networks.

## Main Diagram
```text
Admin -> Public Network -> Bastion Host -> Private Server -> (Private Database)
```

## 3 Concrete Examples
1. **SSH Jump Host:** Admins SSH into a bastion, then reach private servers.
2. **Database Admin Access:** DB tools connect through a bastion instead of exposing the database publicly.
3. **Emergency Operations Access:** A locked-down bastion provides audited break-glass access.

## TypeScript Example
```typescript
// SSH only through bastion — private subnet not reachable directly
const cmd = `ssh -J bastion.prod.internal app-server.internal`;
exec(cmd);
```

## Architecture Questions
- What private resources require admin access?
- Who can access the bastion?
- Is MFA required?
- How are sessions logged?
- How is the bastion hardened and patched?
- Can just-in-time access replace always-on access?

## When to Use
- Private resources need controlled admin access.
- Direct public access is unsafe.
- Session auditing and hardened access are required.

## When NOT to Use
- Modern identity-aware access removes the need.
- The bastion becomes a shared unmanaged backdoor.
- Sessions are not logged or controlled.
