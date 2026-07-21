# Secrets Vault

## Core Idea
Secrets Vault centrally stores, controls, rotates, and audits access to secrets such as passwords, API keys, certificates, and tokens.

## Problem It Solves
- Secrets spread across code, config files, developer machines, and CI/CD pipelines create leakage and rotation risk.

## Main Diagram
```text
Application -> Workload Identity -> Secrets Vault -> Secret / Dynamic Credential -> Audit Log
```

## 3 Concrete Examples
1. **Database Credentials:** Applications retrieve short-lived DB credentials from the vault.
2. **API Key Storage:** Third-party API keys are stored centrally and injected at runtime.
3. **Certificate Management:** TLS certificates are issued and rotated through the vault.

## TypeScript Example
```typescript
const dbPassword = await vault.read('secret/data/db');
const conn = connect({ password: dbPassword });
await conn.ping();
// credentials never live in source control or env files
await ordersRepo.query(conn);
vault.rotate('secret/data/db');
```

## Architecture Questions
- What secrets exist and who owns them?
- Who or what can read each secret?
- Are secrets static or dynamic?
- How is access audited?
- How are secrets rotated?
- What happens if the vault is unavailable?

## When to Use
- Secrets are spread across code/config/pipelines.
- Rotation and audit are required.
- Applications can authenticate to retrieve secrets safely.

## When NOT to Use
- Apps cannot authenticate safely to the vault.
- Vault availability and recovery are not designed.
- Static secrets in vault are never rotated.
