# Wedge, demos, and replication — what to do about the market gap

**Audience:** founders, sales, integrators, demo leads, builders  
**Pairs with:** [Capability_Model](../TSD/Capability_Model.md) · [Risks](../Subsystem/Risks.md) · [ConOps](../ConOps/ControlPanelOntology_ConOps.md)

Buyers judge **live demos**, not SRVM rows. Open scenarios and deferred GAPs mean the **written** story can run ahead of the **product** until you close that gap deliberately. This guide is the operating playbook.

**Tracked as:** [RISK-01…04](../Subsystem/Risks.md#market-and-go-to-market-risks) in the gap/risk catalog.

---

## 1. Sharp wedge: **Ontology + AI** (not generic “AI + ERP”)

**Brand pair:** say **Ontology** and **AI** together — map first, assistants on the map. Copy sheet: [Messaging_Ontology_and_AI.md](./Messaging_Ontology_and_AI.md).

### Say

| Message | One line |
|---------|----------|
| **Category** | **Ontology + AI** for **manufacturing** — governed hub, not a chat wrapper on ERP |
| **Ontology** | One product-owned **business map** (types, links, actions) — Schema / Explorer / Vertex / Process |
| **AI** | Classifies to known intents; runs **allowlisted skills only** — same gateway path as operators |
| **Mechanism** | Ontology objects → skills → **connector catalog** (SoA / data / logic) → evidence |
| **Product scope** | **Full manufacturing map** + ERP section launcher + multi-peer catalog — not an estimate-only or ERP-only SKU |
| **First live proof** | Reference carbide shop: **Estimate** read via Odoo SoA peer; other types/skills follow same pattern |
| **ERP position** | Odoo is **first configured SoA peer** on the reference shop — one edge among many, not the product definition |

### Do not lead with

- “AI copilot for ERP” **without Ontology** (crowded; implies chat-over-API with no map or governance)
- “Digital twin of the plant” (GAP-01 deferred)
- “Customers edit their own Foundry” (GAP-03 deferred)
- “All connectors live today” (GAP-09…12 — architecture + simulate stubs until TR)

### Competitive frame

You compete on **Ontology + governed AI** at SMB cost — **Foundry-shaped** (ontology hub, Explorer, Vertex, peers, governed actions) for buyers who know Palantir’s pattern; **not** clone, twin, or enterprise scale. **Ontology** is the center; **AI** is explicit but never bypasses the map or allowlist. Foundry pitch: [Messaging_Ontology_and_AI § Foundry](./Messaging_Ontology_and_AI.md#foundry-shaped--how-to-sell-the-analogy).

---

## 2. Demo script — hub first (≈12 minutes)

Order matters. **Never** open on Odoo settings or the ERP Map grid.

| Step | Where | Show | Say |
|------|--------|------|-----|
| 1 | `/ontology` → **Schema** | **All** entity types (make, QC, inventory, ship, …) | “Full **manufacturing ontology** — not one ERP module.” |
| 2 | **Vertex / Process** | Type graph + estimate→ship spine | “Foundry-style exploration across the **whole shop model**.” |
| 3 | **Explorer** → several types | Live on types with skills; **demo** labeled elsewhere | “Each type can bind to **its owning peer** — federated reads, not a twin DB.” |
| 4 | `/integrations` | SoA + data + logic catalog | “**Multi-edge** — ERP, MES, data, rules; Odoo is first live SoA on our reference shop.” |
| 5 | ERP Map `/` (optional) | Sales, MRP, inventory, accounting tiles | “Same hub — **full ERP surface area**, not estimates-only.” |
| 6 | Section intent → dry-run | Any allowlisted domain | “**Governed** writes across domains — dry-run, approve, evidence.” |
| 7 | `/integrations/odoo` | Only if buyer cares | “One **peer** config — not the architecture center.” |

**Demo default route:** bookmark `/ontology`, not `/`.

---

## 3. Demo honesty (story vs product)

SRVM closure is for **V&V and the shop**; prospects need **visible labels** and a **short script**.

| UI / narrative | Rule |
|----------------|------|
| Live vs demo rows | Always show `live` / `demo` (Explorer already does) |
| Simulate connector test | Say “simulate” when Odoo is down |
| Catalog stubs | Label **architecture stub** — “pattern proven, live peer next” |
| Multi-edge claims | Safe at **M0–M1**: catalog + one live SoA; defer live MES until OPS-014 TR |
| GAP-02 (estimate issues) | Do **not** demo find/persist/dismiss unless implemented — say “on roadmap, SAC-008” |

**Pre-demo checklist:** [Capability_Model §6](../TSD/Capability_Model.md) plus: ERP reachable or rehearse simulate; no “AI magic” without showing skill + allowlist.

---

## 4. Engineering priorities (demo credibility, not doc theater)

Rank by **what buyers see**, aligned with [Capability_Model proof ladder](../TSD/Capability_Model.md):

| Priority | Outcome | Scenario / gap |
|----------|---------|----------------|
| **P0** | Hub-first UI (nav, metadata, `/integrations` catalog) | Narrative |
| **P1** | `connector_id` resolution on one read skill (catalog-driven) | M1 · OPS-014 path |
| **P2** | Second SoA **simulate** health + one skill in UI | GAP-09 |
| **P3** | GAP-02 thin slice only if it wins deals (find issues read-only) | OPS-011 |
| **P4** | Data binding demo on one property (simulate OK) | GAP-10 · OPS-015 |

Do **not** build twin engine or customer ontology editor to fix messaging.

---

## 5. Replication — services + product until onboarding is productized

Today replication is **integrator-led rebind**, not self-serve PLG (GAP-03).

### Services offer (sell explicitly)

| Package | Deliverable | Uses |
|---------|-------------|------|
| **Discovery** | Entity types, peer list, skill allowlist for their shop | ConOps + SRD-Candidates verticals |
| **Rebind** | `entity-types/*`, `bindings/<connector>/*`, `catalog/connectors.yaml` | Same hub binaries |
| **Verify** | Customer OPS subset + TR → SRVM rows | V-Model pack |
| **Run** | Compose / env + secrets runbook | SAC-009 guides |

### Productize over time (reduce services hours)

| Phase | Product artifact | Cuts services cost |
|-------|------------------|-------------------|
| **R1** | Connector **pack** template (Odoo + simulate peers) | Repeatable catalog |
| **R2** | **Vertical template** pack (MFG/QC/SHIP from SRD-Candidates) | Faster type graph |
| **R3** | **Deployment profile** doc → scripted env (profiles YAML) | Onboarding checklist |
| **R4** | Guided “first binding” wizard (product-owned, not GAP-03 tenant editor) | First connector without fork |

**Sales line:** “We replicate **patterns and bindings**, not a custom control plane per customer.”

**Two SKUs (same hub):** SaaS multi-tenant (features ON) vs dedicated single-tenant (features OFF — pricing / entitlement). Spec only until TR: [Product_Packaging_Tenancy](./Product_Packaging_Tenancy.md) · RISK-05.

---

## 6. Weekly rhythm (keep story and demo aligned)

1. **One demo recording** against this script — note every “we’d say X but UI shows Y” gap → P0–P4 backlog item.  
2. **Messaging audit** — website/deck one-liner must match “Say” table in §1.  
3. **No scenario closed without TR** — demos do not replace [SCENARIOS.md](../Subsystem/SCENARIOS.md) evidence.  
4. **Replication SOW** references Capability_Model + connector catalog, not “custom ERP AI.”

---

## Related

- [Capability_Model](../TSD/Capability_Model.md)  
- [SRD-Candidates](../Subsystem/SRD-Candidates.md) — vertical + wedge backlog for rebind  
- [TestPlans](../TestPlans/README.md) — TR before SRVM closure  
- Connector catalog: [`resources/packages/ontology/catalog/connectors.yaml`](../../../resources/packages/ontology/catalog/connectors.yaml)
