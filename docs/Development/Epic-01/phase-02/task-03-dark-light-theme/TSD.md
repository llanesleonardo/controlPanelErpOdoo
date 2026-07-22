# Dark and light theme — Technical Specification Document (TSD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Planned approach (later epic)

- Next.js theme provider (CSS variables / class on `html`)
- `User.theme_preference`: `light` | `dark` | `system` (optional system)
- Toggle component in shell header
- `PATCH /profile` includes theme field

## Notes

No UI code in Epic-01. Avoid purple-default AI aesthetic when implementing; follow product design rules at build time.
