# Risks and gaps

Intentional open items — **not bugs**. Written for the shop + builders.

**North Star:** Foundry-**shaped** ontology hub for a small manufacturing tool company (reference: carbide tools), **replicable** via the same patterns. Deferred “Foundry-like” surfaces (maps, builders) are **best-practice inspiration**, not clone targets.

**Robust enough:** see [Capability_Model](../TSD/Capability_Model.md) — architectural invariants (multi-edge SPI, observation without twin, product-owned rebind) are **required**; live second SoA / data / logic / automation are **staged** (GAP-09…12), not optional rewrites.

| ID | Topic | Status | Residual |
|----|-------|--------|----------|
| **GAP-01** | Full graph engine (live twin of bound peer instances) | **Deferred** | Instance store, CDC, path queries across edges — not “every ERP row” alone |
| **GAP-02** | Estimate-issues find / persist / dismiss runtime | **Deferred** | Code + UI (docs: [SAC-008](./SAC-008/README.md), [Component_Map](../TSD/Component_Map.md#estimate-issues-path--patterns)) |
| **GAP-03** | Customer-authored ontology | **Deferred** | Tenant editors / marketplace — v1 stays product-owned |
| **GAP-04** | Ontology Manager (Schema) | **Satisfied (v1 slice)** | Browser authoring, icon registry field, binding inspector, publish gates |
| **GAP-05** | Object Explorer | **Satisfied (v1 slice)** | Cross-type index, instance links, more live reads, server layouts |
| **GAP-06** | Vertex Search Around | **Satisfied (v1 slice)** | Instance seed, style-by-property, shared server templates, simulation |
| **GAP-07** | Geospatial maps | **Deferred** | Site/region on objects + map canvas (inspiration, not a clone roadmap) |
| **GAP-08** | Workshop / Quiver-style builders | **Deferred** | No-code apps / chart studio (inspiration, not feature parity) |
| **GAP-09** | Second (non-ERP) SoA connector | **Deferred** | Catalog + health + skills beyond `odoo` — [OPS-014](./SAC-005/Scenarios/OPS-014.md) |
| **GAP-10** | Data-source peer bindings | **Deferred** | Bind data edges into ontology without public raw payloads — [OPS-015](./SAC-005/Scenarios/OPS-015.md) |
| **GAP-11** | Logic-source peer execution | **Deferred** | Action → skill → logic connector — [OPS-016](./SAC-004/Scenarios/OPS-016.md) |
| **GAP-12** | Automation same-path runtime | **Deferred** | Automations fire allowlisted skills with approval — [OPS-018](./SAC-007/Scenarios/OPS-018.md) |
| **GAP-13** | SaaS multi-tenant isolation + admin runtime | **Deferred** | Row/schema partition, tenant admin UI, metering — specified [OPS-024](./SAC-009/Scenarios/OPS-024.md); env stub only today |

## Market and go-to-market risks

Product and architecture gaps above are **intentional deferrals**. The rows below are **positioning and delivery risks** — they do not get “Satisfied” by docs alone; they need messaging discipline, demo practice, and staged engineering.

| ID | Risk | Status | Mitigation / residual |
|----|------|--------|------------------------|
| **RISK-01** | **Crowded “AI + ERP” messaging** — buyers bucket you with generic copilots | **Active** | Lead with **Ontology + AI** for manufacturing (map → allowlisted skills → peers → evidence). Never “AI ERP” without **Ontology**. [Messaging_Ontology_and_AI](../Guides/Messaging_Ontology_and_AI.md) · [Wedge guide §1](../Guides/Wedge_Demo_and_Replication.md) |
| **RISK-02** | **Odoo-first reads as “another Odoo addon”** — ERP Map / peer config dominate first impression | **Active** | Sales and demos **open on hub** (`/ontology`, peer catalog), Odoo last. UI/nav/metadata and `/integrations` catalog reinforce multi-edge. Same guide §2 |
| **RISK-03** | **Story runs ahead of product** — Open OPS/E, GAP-02, multi-edge runtime lag architecture | **Active** | Buyers judge **live demos**, not SRVM. Label live vs demo; do not claim closed scenarios without TR. Prioritize demo-visible proof (catalog-driven skills, simulate second SoA). Guide §3–§4 · [Capability_Model](../TSD/Capability_Model.md) M0–M5 |
| **RISK-04** | **Replication is services-heavy** — no self-serve onboarding (bindings, packs, verticals) at PLG scale | **Active** | Sell explicit **Discovery → Rebind → Verify → Run**; productize connector packs, vertical templates, deployment profiles over time (still product-owned ontology — GAP-03). Guide §5 · [SRD-Candidates](./SRD-Candidates.md) |
| **RISK-05** | **Pricing / SKU vs entitlement mismatch** — sell SaaS multi-tenant features on a dedicated deploy (or reverse) | **Active** | Two offers only: **A SaaS** (multi-tenant features ON) · **B Dedicated** (features OFF). Map price list → `DEPLOYMENT_MODE` + entitlements. [Product_Packaging_Tenancy](../Guides/Product_Packaging_Tenancy.md) · OPS-023 / OPS-024 |

**Link to technical gaps:** RISK-03 worsens when GAP-02 and GAP-09…12 stay deferred; RISK-04 overlaps GAP-03 (customer editors deferred ≠ replicability deferred).

### RISK-01 — what to do (crowded “AI + ERP”)

| Layer | Action |
|-------|--------|
| **Category** | **Ontology + AI** for manufacturing — not “AI ERP” or “Odoo copilot” alone. |
| **One-liner** | “Your shop **ontology** first; **AI** and operators on the same allowlisted skill path; evidence on writes.” |
| **Order** | Show **Ontology** (`/ontology`), governance (dry-run), peers; then **AI** on the same skills (console / intents). |
| **Copy audit** | Hero must include **both** Ontology and AI. [Messaging_Ontology_and_AI](../Guides/Messaging_Ontology_and_AI.md) — README, deck, site, LinkedIn. |
| **Competitive answer** | Copilot = chat + open API. We = **Ontology + AI**, **Foundry-shaped** for manufacturing — map, Explorer/Vertex, allowlist, peer catalog (not Palantir parity). [Foundry FAQ](../Guides/Messaging_Ontology_and_AI.md#faq--is-this-like-palantir-foundry) |
| **Say no** | Decline RFPs that only want chat-over-Odoo with no ontology, no allowlist, no audit trail. |
| **Internal** | [Wedge guide §1](../Guides/Wedge_Demo_and_Replication.md) + messaging sheet before every external touchpoint. |

### RISK-02 — what to do (Odoo-first looks like an addon)

**What goes wrong:** Prospects see Odoo-style module tiles, “ERP Odoo” nav, or connector settings first → they assume **Odoo customization** or **another ERP module**, not a **hub** that could add MES, files, or rules later.

**What “hub + multi-edge lead” means:** In the **first 3 minutes** they see (1) the **full manufacturing ontology** (Schema / Process — not one type), (2) **multiple peer kinds** in the catalog (SoA, data, logic), (3) federated Explorer — **Estimate** is first **live** binding on the reference shop, not the product scope.

| Layer | Action |
|-------|--------|
| **Demo** | Bookmark **`/ontology`**. Then **`/integrations`**. Odoo config and ERP Map **last or skip**. Script: [Wedge guide §2](../Guides/Wedge_Demo_and_Replication.md). |
| **Talk track** | “We sit **above** ERP — same pattern for MES and data when you turn them on.” Never “we extend Odoo.” |
| **UI** | Brand **Ontology + AI** → `/ontology`; nav lists **Ontology map** + **Peer edges** before ERP sections; live catalog at `GET /integrations/catalog` (stubs show **simulate · stub**). |
| **Deck / site** | Diagram: **Ontology center**, peers on the edge — Odoo one box among several. No Odoo logo as hero. |
| **Honesty** | Stubs labeled **architecture stub**; live wedge only on Odoo today — same as GAP-09…12, without hiding the catalog. |
| **Engineering (credibility)** | P1–P2: catalog-driven skills + simulate second SoA visible in UI ([Capability_Model](../TSD/Capability_Model.md) M1) so multi-edge is not “slides only.” |

**Residual:** Until M1+ runtime ships, multi-edge proof is **catalog + architecture** in the room; live second peer closes the objection “you’re ERP-only in practice.”

### RISK-03 — what to do (story ahead of product)

**What it is:** The **V-Model pack** (ConOps, SRD, scenarios, test plans) describes the **full** Ontology + AI hub — multi-edge, estimate-issues, automation, many OPS stories. In **code**, much of that is still **Open** (no test report / SRVM closure) or **deferred** (GAP-02, GAP-09…12). **Prospects do not read SRVM**; they watch a **demo** and assume everything you show or imply is shipped.

**What goes wrong:** You narrate “second SoA, data bindings, issue finder, automations” but the UI only shows **live Estimate + ontology slices + catalog stubs** → trust breaks (“ vaporware ”). Or you **under-sell** because docs say Open while the demo is actually good enough for the wedge.

**Two truths to hold at once**

| For builders / V&V | For buyers / demos |
|--------------------|-------------------|
| Scenario **Open** until TR + SRVM evidence | Show only what runs; **label** live vs demo vs stub |
| GAP “Satisfied (v1 slice)” ≠ OPS closed | “Roadmap” = named OPS/GAP, not hand-waving |
| Architecture multi-edge is **required** (INV-01…) | Live peers beyond Odoo are **staged** (M0–M5) |

| Layer | Action |
|-------|--------|
| **Demo scope** | **In scope** = full ontology (all types), Process/Vertex, ERP **sections** launcher, dry-run across domains, multi-peer catalog with honest badges, live reads where allowlisted (Estimate first on reference shop). **Out of scope** until built = specific runtimes (GAP-02 issues persist, GAP-09…12 live peers beyond staged catalog) — not “we only sell estimates.” |
| **Labels** | Explorer **live** / **demo**; integrations **Live wedge** / **Architecture stub** + **simulate · stub**; Odoo test **simulated** when not live. |
| **Talk track** | “**Full manufacturing map today**; **live skills** roll out per binding (Estimate/Odoo first on reference shop); **next peer** same catalog (OPS-014) — scenarios Open until TR.” |
| **Do not claim** | “All scenarios passed,” “production multi-edge,” “issues workflow shipped” — unless OPS-011 / OPS-014 TR exists. |
| **Engineering priority** | Close **demo gaps** first ([Wedge guide §4](../Guides/Wedge_Demo_and_Replication.md)): catalog-driven `connector_id`, stub health (done), simulate MES skill (M1). GAP-02 only if it wins deals. |
| **Internal** | SRVM stays honest; **sales** uses [Wedge §3](../Guides/Wedge_Demo_and_Replication.md) honesty table + weekly demo recording vs backlog. |

**Link:** RISK-03 gets worse if RISK-01/02 make promises the demo cannot show; it gets better if demos match [Capability_Model](../TSD/Capability_Model.md) M0 and move toward M1 with visible evidence.

### RISK-04 — what to do (replication is services-heavy)

**What it is:** The **architecture is replicable** — another manufacturer gets the **same** Ontology + AI hub (same apps, V-Model, patterns) with **new** product-owned entity types, **bindings**, and **connector catalog** rows ([Capability_Model §5](../TSD/Capability_Model.md)). **Onboarding that rebind is not productized** — no self-serve “sign up, edit your Foundry, go live” (GAP-03 deferred). Each new plant today looks like **integrator work**: discovery, YAML/contracts, env/secrets, customer TR — i.e. a **services + product** sale, not pure PLG SaaS.

**What goes wrong**

| Mistake | Consequence |
|---------|-------------|
| Promise **self-serve** ontology studio or marketplace | Collides with GAP-03; support nightmare |
| Treat reference carbide shop as **only** customer | Under-sells replicability |
| Custom **fork** per customer | Destroys hub model; RISK-04 becomes unbounded services |
| Hide services effort in pricing | Margin shock, failed deployments |

**What replicability is *not*:** a different control plane repo per customer. **What it is:** rebind packages + verification on **one** product line.

| Layer | Action |
|-------|--------|
| **Sell explicitly** | **Discovery → Rebind → Verify → Run** packages ([Wedge guide §5](../Guides/Wedge_Demo_and_Replication.md)); SOW names deliverables (types, bindings, catalog, OPS subset, Compose runbook). |
| **Sales line** | “We replicate **patterns and bindings**, not a bespoke hub per plant.” |
| **Use backlog** | [SRD-Candidates](./SRD-Candidates.md) + vertical packs (MFG, QC, SHIP, INV) as **starting templates**, not from-scratch ontology every time. |
| **Productize (R1→R4)** | Connector pack template → vertical template pack → **`DEPLOYMENT_PROFILE` + env** ([Deployment_Tenancy_Env](./SAC-009/Guides/Deployment_Tenancy_Env.md)) → guided first binding (still **product-owned**, not customer GAP-03 editor). |
| **Do not promise** | PLG signup, tenant ontology marketplace, “customer implements connectors alone” without integrator gate. |
| **Partner model** | Odoo/MES integrators run **Rebind + Verify**; you maintain hub + catalog SPI. |

**Link to GAP-03:** Customer **authors** ontology in the browser = deferred. Customer **runs** a rebinding you shipped = in scope. RISK-04 shrinks as R1–R4 artifacts absorb repeat services hours.

### RISK-05 — what to do (pricing vs entitlement)

**What it is:** You sell **two SKUs** of the same Ontology + AI hub — **SaaS multi-tenant** (features ON) and **dedicated single-tenant** (features OFF, different price). Risk is quoting the wrong entitlement for the price (e.g. “dedicated price” but enabling tenant switcher, or SaaS price on a single box with no isolation).

| Layer | Action |
|-------|--------|
| **Price list** | Two lines only: Offer A subscription · Offer B license+deploy — see [Product_Packaging_Tenancy](../Guides/Product_Packaging_Tenancy.md) |
| **Deploy** | Offer A → `multi_tenant` · Offer B → `single_tenant` (env / GitHub / Azure vars) |
| **Contract** | Dedicated SOW states multi-tenant features **excluded**; SaaS MSA states they **included** (when GAP-13 ships, isolation SLAs) |
| **Do not build yet** | Full SaaS isolation — keep OPS-023/024 **Open**; env stub is enough for mode selection |
| **Sales** | “Same product; SKU chooses whether multi-tenant is available — that is the pricing difference.” |

## What “Satisfied (v1 slice)” means

You can already use Schema, Explorer (**live Estimate via the ERP SoA peer**), and Vertex on `/ontology`. The v1 slice is the **reference-shop Estimate / ERP path**. Multi-edge live objects, ownership inspector depth, and twin-scale features remain Open ([OPS-013](./SAC-004/Scenarios/OPS-013.md), [OPS-015](./SAC-005/Scenarios/OPS-015.md), [OPS-022](./SAC-006/Scenarios/OPS-022.md)).

**Important:** gap “Satisfied (v1 slice)” is **not** scenario closure. OPS/E rows in [SCENARIOS.md](./SCENARIOS.md) and [SRVM](../SRVM/ControlPanelOntology_SRVM.md) stay **Open** until test evidence exists. ERP is one SoA peer; ownership is per binding ([OPS-022](./SAC-006/Scenarios/OPS-022.md)).

## Robust enough vs deferred (summary)

| Concern | Robust enough (ship narrative) | Deferred gap |
|---------|-------------------------------|--------------|
| Multi-edge | Catalog SPI, bindings, skill path, simulate stubs | GAP-09…12 until OPS TR |
| Twin / graph | Schema, Explorer, Vertex, Process, federated reads, evidence | GAP-01 |
| Ontology ownership | Product rebind for another company | GAP-03 customer editors |
| GTM / demos | Wedge messaging, hub-first demos, honest labels | RISK-01…04 until TR + productized onboarding |
| Packaging SKUs | SaaS vs dedicated documented; mode via env | RISK-05 · GAP-13 · OPS-023/024 Open |

## Related

- [Wedge_Demo_and_Replication](../Guides/Wedge_Demo_and_Replication.md) — mitigations for RISK-01…05  
- [Product_Packaging_Tenancy](../Guides/Product_Packaging_Tenancy.md) — SaaS vs dedicated  
- [Capability_Model](../TSD/Capability_Model.md)  
- [ConOps](../ConOps/ControlPanelOntology_ConOps.md)  
- [SAC-006 Ontology](./SAC-006/README.md)  
- [SRD-Candidates](./SRD-Candidates.md) — reference-shop domain backlog (MFG / QC / DOC / SHIP / INV / …); also the wedge list when rebinding for another manufacturer  
- [Pattern_Selection](../TSD/Pattern_Selection.md) — how we get Foundry-class outcomes without copying  
- Connector catalog stub: [`catalog/connectors.yaml`](../../../resources/packages/ontology/catalog/connectors.yaml)  
