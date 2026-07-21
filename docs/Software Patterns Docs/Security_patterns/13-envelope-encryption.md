# Envelope Encryption

## Core Idea
Envelope Encryption encrypts data with a data encryption key, then encrypts that key with a master/key-encryption key.

## Problem It Solves
- Large data needs efficient encryption while central key management and rotation remain practical.

## Main Diagram
```text
Plaintext Data -> Data Encryption Key -> Encrypted Data -> Key Encryption Key / KMS -> Encrypted Data Key
```

## 3 Concrete Examples
1. **Object Storage Encryption:** Each file is encrypted with a data key; the data key is encrypted by KMS.
2. **Database Field Encryption:** Sensitive fields are encrypted with per-record keys wrapped by a master key.
3. **Tenant Key Wrapping:** Tenant data keys are wrapped by tenant-specific or KMS-managed keys.

## TypeScript Example
```typescript
const dek = crypto.randomBytes(32);
const encrypted = encrypt(data, dek);
const wrappedDek = kms.encrypt(dek);
store({ ciphertext: encrypted, wrappedKey: wrappedDek });
// Object Storage Encryption:
// Envelope Encryption encrypts data with a data encryption key, then en...
```

## Architecture Questions
- What data needs encryption?
- Where are data keys generated?
- What key encrypts the data key?
- How are keys rotated?
- Where are encrypted data keys stored?
- Who can decrypt and under what policy?

## When to Use
- Large data needs encryption with manageable key rotation.
- Central key management is required.
- Per-object or per-tenant data keys are useful.

## When NOT to Use
- Simple managed encryption is enough.
- Key hierarchy is not understood.
- Losing wrapped keys would make data unrecoverable.
