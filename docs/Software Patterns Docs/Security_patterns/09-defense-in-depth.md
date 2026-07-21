# Defense in Depth

## Core Idea
Defense in Depth uses multiple independent security layers so one control failure does not expose the whole system.

## Problem It Solves
- A single security control can fail, be bypassed, misconfigured, or compromised.

## Main Diagram
```text
Threat -> Edge Protection -> Authentication -> Authorization -> Application Controls
```

## 3 Concrete Examples
1. **Web Application Security:** WAF, authentication, authorization, input validation, encryption, and audit logging all protect the app.
2. **Cloud Account Protection:** IAM least privilege, network segmentation, secrets vault, logging, and monitoring are layered.
3. **Database Protection:** Private networking, strong auth, encryption, backups, and query auditing protect data.

## TypeScript Example
```typescript
// Layered controls: WAF + auth + input validation + encryption
const safe = validator.sanitize(input);
if (!authz(user, action)) throw forbidden();
await db.encryptedInsert(safe);
// Web Application Security:
// Defense in Depth uses multiple independent security layers so one con...
```

## Architecture Questions
- What assets are most valuable?
- What security controls protect each layer?
- What happens if one control fails?
- Are controls independent or redundant in name only?
- How are detections and responses layered?
- Where are the gaps?

## When to Use
- Assets are important enough for layered controls.
- One control failure must not expose everything.
- Detection and prevention should work together.

## When NOT to Use
- Layers are redundant theater, not independent controls.
- No one monitors detections.
- Controls break usability without reducing real risk.
