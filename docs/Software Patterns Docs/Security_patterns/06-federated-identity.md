# Federated Identity

## Core Idea
Federated Identity allows users from one identity domain to access resources in another domain using trusted identity relationships.

## Problem It Solves
- Organizations need users to authenticate with their home identity provider instead of creating separate credentials everywhere.

## Main Diagram
```text
User -> Home Identity Provider -> Trust / Federation -> Service Provider / Application -> Protected Resource
```

## 3 Concrete Examples
1. **Enterprise SSO:** Employees use corporate identity to access SaaS apps.
2. **Partner Portal:** Partners log in with their organization's identity provider.
3. **Cloud Role Federation:** Corporate users assume cloud roles without long-lived cloud passwords.

## TypeScript Example
```typescript
const profile = await saml.validate(assertion);
const user = await directory.provisionOrUpdate({ id: profile.nameId, email: profile.email });
req.user = user;
```

## Architecture Questions
- Which identity providers are trusted?
- What protocol is used: SAML, OIDC, or another federation method?
- How are external claims mapped to local roles or attributes?
- How is trust established and rotated?
- How are users deprovisioned?
- How are audit trails correlated across identity domains?

## When to Use
- External or enterprise identities should be reused.
- Separate local credentials are undesirable.
- Trust relationships can be managed.

## When NOT to Use
- Trust boundaries are unclear.
- External identity claims cannot be governed.
- Local accounts are simpler and sufficient.
