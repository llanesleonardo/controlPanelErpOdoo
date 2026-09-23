# Epic-07 — System design (Ontology Language)

Ontology sits between NestJS gateway and allowlisted skills. Connectors and SoRs unchanged. See [ontology.md](../ontology.md).

```mermaid
flowchart TB
  subgraph clients [Clients]
    Web["Next.js\nERP Map + Ontology browser"]
    OC["OpenClaw\nTool Calling → actions"]
  end

  subgraph controlPlane [Control_plane]
    GW["NestJS Gateway\nGET /ontology catalog\nPEP + skills execute"]
    Onto["packages_ontology\nEntity types Links Actions"]
    Contracts["packages_contracts\ntaxonomy skills"]
    ORCH[FastAPI_Orchestrator]
    PG[(Postgres_CP)]
  end

  subgraph connectors [First_party]
    Bind["bindings/odoo\nACL field map"]
    OdooAd[Odoo_Adapter]
  end

  SoR[(Odoo_SoR)]

  Web --> GW
  OC -.-> GW
  GW --> Onto
  Onto --> Contracts
  GW -->|skills_execute| ORCH
  GW --> PG
  ORCH --> OdooAd
  OdooAd --> Bind
  OdooAd --> SoR
```

## Estimate object (v1 seed)

| Piece | Value |
|-------|--------|
| Entity type | `Estimate` |
| Action `read` | skill `sales.estimate.read` |
| Action `find_issues` | skill `sales.estimate.find_issues` (Epic-06; catalogued, execute when allowlisted) |
| Binding | `bindings/odoo/estimate.yaml` → `customer.estimate` fields inside ACL only |
