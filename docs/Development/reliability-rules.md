# Reliability rules

- No direct free-form writes to Odoo.
- Every task mapped to one taxonomy code.
- One skill selected from an allowlist (not dynamically invented).
- Every write supports dry-run first.
- Every write returns structured evidence.
- Every failure creates an incident record.
- Repeated incidents update a reusable runbook (recommendation only).
- Production changes require role-based approval by threshold.

Skills call only registered APIs with typed contracts, explicit permissions, and policy guards.
