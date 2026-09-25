# Messaging — Ontology + AI

**Use both words on purpose.** **Ontology** names the product center (the shop map). **AI** names how assistants participate — on that map, not around it.

**Risk:** “AI + ERP” alone sounds like every copilot. **Ontology + AI** is the wedge: *full manufacturing map first, governed AI second.*

**Scope rule:** The **product** is the whole **manufacturing ontology** (quote → estimate → buy → make → inspect → ship, inventory, QC, documents, floor jobs) and **multi-peer** edges (SoA, data, logic). **Estimate + Odoo** is the **first live read binding** on the reference shop — not the product boundary. Do not shrink pitch or Foundry analogy to “an estimate tool” or “ERP-only.”

**Foundry-aware buyers:** Sell **Foundry-shaped** — same *class* of idea (ontology hub, exploration, governed actions on peer systems), **not** Palantir feature parity or enterprise scale. See [Foundry comparison](#foundry-shaped--how-to-sell-the-analogy) below.

---

## Hero (external)

| Slot | Copy |
|------|------|
| **Category** | **Ontology + AI** for manufacturing — **Foundry-shaped** control plane |
| **Subhead** | Like Foundry’s ontology layer for the shop floor: one business map, peer connectors, allowlisted skills, evidence on writes — SMB scope |
| **One-liner** | **Foundry-class** ontology hub for **full manufacturing ops** — one map across objects and peers; **AI** and operators on the same governed skill path |
| **Elevator (Foundry alumni)** | “Foundry’s ontology OS pattern — Schema, Explorer, Vertex, actions on objects — for the **whole shop** (make, QC, inventory, ship, documents), with ERP, MES, data, and logic as **peer edges**, not a single-system addon.” |

## Product scope (what we sell)

| Layer | Scope |
|-------|--------|
| **Ontology** | End-to-end manufacturing language: e.g. Quote, Estimate, Sales order, Purchase order, Manufacturing order, Shop floor job, Inventory, Quality check, Documents, People/attendance — see entity types under `resources/packages/ontology/entity-types/` |
| **Operations UI** | Schema, Explorer, Vertex, **Process map** (estimate → … → ship spine); ERP **section launcher** for sales, MRP, inventory, accounting, … — same hub underneath |
| **Peers** | **Systems of action** (ERP today; MES/SCM next), **data sources**, **logic sources** — one connector catalog, per-object **owning** peer |
| **First live proof** | Reference carbide shop: **Estimate** read via **Odoo** SoA peer — expands by allowlisting skills + bindings, not by replacing the map |

Vertical backlog: [SRD-Candidates](../Subsystem/SRD-Candidates.md) (MFG, QC, DOC, SHIP, INV, …).

## Say

- **Ontology** — full manufacturing map; Schema, Explorer, Vertex, Process for **all** published types  
- **AI** — classifies to known intents, calls **allowlisted skills only**, same gateway as humans  
- **Governed** — dry-run, approve, audit trail; no open-ended vendor API from chat  
- **Peers** — ERP (Odoo first on reference shop), plus MES, files, rules in catalog — **multi-edge by design**  

## Do not say (alone)

- “AI copilot for ERP / Odoo” (no ontology → RISK-01)  
- “AI replaces your ERP”  
- “Digital twin” (GAP-01) · “Customer-built ontology” (GAP-03)  

## FAQ — “Is this just an Odoo addon?”

> No. **Odoo is one peer** in the connector catalog — the product is the **ontology hub** (map + governed skills). The ERP Map is a **section launcher** for Odoo-shaped workflows; MES, data, and logic use the same hub pattern. See [RISK-02](../Subsystem/Risks.md#risk-02--what-to-do-odoo-first-looks-like-an-addon).

## FAQ — “How is this different from an ERP copilot?”

> Copilots start in chat and hit the ERP API. We start in your **ontology** — estimates, orders, inventory as shop objects — and **AI** only runs **allowlisted skills** through connectors, with preview and evidence. **Ontology + AI**, not chat + ERP.

## FAQ — “Is this like Palantir Foundry?”

> **Similar in shape, different in scale.** Foundry centers an **ontology** (objects, links, actions) and connects operational systems through governed pipelines and apps. We use the same **pattern** for **full manufacturing operations** — not a single ERP module: ontology hub, **Schema / Explorer / Vertex / Process**, actions → **allowlisted skills** → **peer connectors** (SoA, data, logic), **Ontology + AI** on one gateway path. We are **not** claiming Foundry clone, full **digital twin** (GAP-01), customer self-serve ontology studio (GAP-03), or every peer **live** on day one (GAP-09…12). Reference deployment: carbide shop with **first live read** on Estimate via Odoo; the **map and ERP sections** already span the wider shop — more skills go live through bindings, not a new product.

## Foundry-shaped — how to sell the analogy

Use this when the buyer knows Foundry, AIP, or “ontology OS.” Always pair **similar to** with **honest bounds** (RISK-03).

| Foundry idea | Our product (ControlPanelOntology) | Demo / proof today |
|--------------|--------------------------------------|--------------------|
| **Ontology** (types, links, actions) | Full manufacturing entity model + `/ontology` Schema | Shipped (v1 slice) |
| **Object Explorer** | Federated list/search via skills per type | All types browsable; **live** reads grow per allowlisted skill (Estimate first on reference shop) |
| **Vertex / Search Around** | Type-level graph across the shop model | Shipped (v1 slice) |
| **Actions on objects** | Ontology action → allowlisted skill → **owning** connector | Skills staged by domain (MFG, QC, INV, …); dry-run on writes |
| **Connectors / pipelines to sources** | First-party **peer catalog** (SoA, data, logic) | Multi-peer catalog; Odoo **first live SoA** on reference shop |
| **Governance & ops** | Dry-run, approve, evidence, correlation | Show on intent path |
| **AI on the ontology** | Same skill path as humans (not chat → raw API) | Console / intents where wired |
| **Workshop / Quiver / full twin** | Deferred inspiration, not roadmap parity | GAP-01, GAP-08 — do not sell |

**Talk track (30 seconds):**  
“If you’ve seen Foundry, you’ve seen the ontology-in-the-middle pattern. We built **Ontology + AI** for **manufacturing end-to-end** — quotes through ship, inventory, QC, floor — with ERP, MES, data, and logic as **peers**. Governed actions and exploration across the **whole map**, not one ERP screen. Foundry petabyte scale isn’t the goal; **operational truth for the shop** is.”

**Do not say**

- “We are Palantir” / “Foundry replacement” / feature checklist parity  
- “Full digital twin of the plant” or “customer builds their own Foundry in the browser” unless GAPs close with TR  

**Do say**

- “**Foundry-shaped** ontology hub” · “**Foundry-class** practices, manufacturing scope” · “Same architectural idea — ontology, peers, governed actions — sized for your shop”

Deep bounds: [Capability_Model](../TSD/Capability_Model.md) · [Risks](../Subsystem/Risks.md) · [ConOps §1](../ConOps/ControlPanelOntology_ConOps.md) · diagram: [Ontology_System_Pattern](../ConOps/Ontology_System_Pattern.md)

## Where this lives

- Playbook: [Wedge_Demo_and_Replication.md](./Wedge_Demo_and_Replication.md)  
- Risk: [RISK-01](../Subsystem/Risks.md#risk-01--what-to-do-crowded-ai--erp)  
- Product intent: [ConOps §1](../ConOps/ControlPanelOntology_ConOps.md)
