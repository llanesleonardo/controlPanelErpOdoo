# TP-OPS-012 — Blocked skill / rate limit / allowlist reject

**Scenario:** OPS-012  
**SHALLs:** SRD-GW-001 … SRD-GW-010 (parent SRD-SEC-001, 002, 004)  
**Status:** Not run

## Method

1. Follow [OPS-012](../../Subsystem/SAC-001/Scenarios/OPS-012.md).  
2. Prefer gateway on host or Compose profile `apps`; set `RATE_LIMIT_MAX` low temporarily if needed to trip 429 safely.  
3. Record pass/fail in Reports/.

## Setup

- Gateway running (`npm run dev:gateway` or Compose)  
- `.env` with `RATE_LIMIT_WINDOW_MS` / `RATE_LIMIT_MAX`  
- Optional: `ERP_MODE=simulate`

## Checks

| Check | Expect |
|-------|--------|
| Allowlisted live path (e.g. Estimate objects / execute `sales.estimate.read`) | Proceeds or clear ERP/simulate error — not “unknown tool invented” |
| Non-allowlisted / unknown skill or intent | 4xx / reject **or** demo fallback with allowlist message |
| Burst over `RATE_LIMIT_MAX` | HTTP 429, clear message |
| Response headers | `X-Correlation-Id` present |
| Request with `X-Actor-Id` | Actor used for rate-limit bucket / logs |

## Reports

Placeholder: add `Reports/TR-OPS-012-01.md` when first run is recorded.
