# Deployment mode — single-tenant vs multi-tenant

Configure **one stack per customer** (single-tenant) or **shared platform** (multi-tenant) with the **same variable names** everywhere: local `.env`, Docker Compose, **GitHub Actions variables**, **Azure App Settings**, Kubernetes secrets, etc.

Product-owned ontology rebind per customer uses **`DEPLOYMENT_PROFILE`** (RISK-04 / replication). Row-level `tenant_id` on all control-plane tables is **future** ([SRD-TEN](../../SRD-Candidates.md)); v1 resolves tenant on the **request** and exposes config via API.

---

## Variables

| Variable | Required | Values | Purpose |
|----------|----------|--------|---------|
| **`DEPLOYMENT_MODE`** | No (default `single_tenant`) | `single_tenant` · `multi_tenant` | Tenancy model for this deployment |
| **`TENANT_ID`** | No (default `default`) | string slug | **Single-tenant:** fixed tenant for the whole stack. **Multi-tenant:** default when `X-Tenant-Id` header is omitted |
| **`DEPLOYMENT_PROFILE`** | No (default `reference_carbide`) | string id | Which product-owned ontology/catalog baseline this deployment uses (rebind packs later) |
| **`NEXT_PUBLIC_DEPLOYMENT_MODE`** | No | same as `DEPLOYMENT_MODE` | Web UI hint (build-time); keep in sync at deploy |

Aliases accepted: `single-tenant` / `multi-tenant` (normalized to underscore).

---

## Behavior

| Mode | Who sets tenant | Header |
|------|-----------------|--------|
| **single_tenant** | Always **`TENANT_ID`** from env | `X-Tenant-Id` ignored (one customer per deploy) |
| **multi_tenant** | **`X-Tenant-Id`** per request, else **`TENANT_ID`** fallback | Required for strict isolation later; gateway echoes `X-Tenant-Id` on responses |

**Verify at runtime**

- Gateway: `GET /config/deployment`
- Orchestrator: `GET /config/deployment` (also on `/health` → `deployment`)

---

## Local & Docker

Root [`.env.example`](../../../../.env.example) — copy to `.env`.

```bash
DEPLOYMENT_MODE=single_tenant
TENANT_ID=acme-carbide
DEPLOYMENT_PROFILE=reference_carbide
```

[Compose](../../../../docker/docker-compose.yml) passes the same keys to **gateway**, **orchestrator**, and **web**.

---

## GitHub Actions (repository variables)

**Settings → Secrets and variables → Actions → Variables** (non-secret):

| Variable | Example |
|----------|---------|
| `DEPLOYMENT_MODE` | `single_tenant` |
| `TENANT_ID` | `customer-acme` |
| `DEPLOYMENT_PROFILE` | `reference_carbide` |

Example job env:

```yaml
env:
  DEPLOYMENT_MODE: ${{ vars.DEPLOYMENT_MODE }}
  TENANT_ID: ${{ vars.TENANT_ID }}
  DEPLOYMENT_PROFILE: ${{ vars.DEPLOYMENT_PROFILE }}
```

Use **different variable values per environment** (e.g. environment-scoped vars for `production-acme` vs shared `staging` with `multi_tenant`).

Secrets (DB, Odoo, JWT) stay in **Secrets**, not Variables.

---

## Azure App Service / Container Apps

**Configuration → Application settings** (same names as env):

| App setting | Example |
|-------------|---------|
| `DEPLOYMENT_MODE` | `multi_tenant` |
| `TENANT_ID` | `platform-default` |
| `DEPLOYMENT_PROFILE` | `mfg-vertical-v1` |

Set on **gateway**, **orchestrator**, and **web** slots so all tiers agree. For web, add `NEXT_PUBLIC_DEPLOYMENT_MODE` to match (rebuild when changed).

Optional: Azure DevOps variable groups / Bicep `appSettings` blocks mirroring the table above.

---

## Multi-tenant client calls

When `DEPLOYMENT_MODE=multi_tenant`, browsers or SDKs should send:

```http
X-Tenant-Id: customer-slug
X-Actor-Id: user-or-service-id
X-Correlation-Id: uuid
```

Gateway forwards context to orchestrator on skill paths (tenant in logs / future DB partition).

---

## Replication (RISK-04) and packaging (RISK-05)

| Customer model | Typical settings | SKU |
|----------------|------------------|-----|
| **Dedicated plant** | `single_tenant` + unique `TENANT_ID` + customer `DEPLOYMENT_PROFILE` | **Offer B** — multi-tenant features **OFF**; license + deploy pricing |
| **Hosted SaaS platform** | `multi_tenant` + per-session `X-Tenant-Id` | **Offer A** — multi-tenant features **ON**; subscription pricing |

Commercial packaging (specified, isolation not fully built): [Product_Packaging_Tenancy](../../../Guides/Product_Packaging_Tenancy.md) · OPS-023 / OPS-024.

---

## Related

- [Secrets_and_Env.md](./Secrets_and_Env.md)  
- [Compose_and_Runbook.md](./Compose_and_Runbook.md)  
- [Capability_Model §5](../../../TSD/Capability_Model.md) · [RISK-04](../../Risks.md)  
- Pattern (future DB): [Multi-Tenant Partitioning](../../../../Software%20Patterns%20Docs/Data_domain_patterns/21-multi-tenant-partitioning.md)
