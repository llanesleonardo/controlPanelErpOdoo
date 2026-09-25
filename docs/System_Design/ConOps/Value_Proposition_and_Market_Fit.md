# ControlPanelOntology — Value proposition and market fit

**Status:** Draft (sales / positioning companion to ConOps)  
**Audience:** buyers, integrators, product builders  
**Operational intent:** [ControlPanelOntology_ConOps.md](./ControlPanelOntology_ConOps.md)

---

## Value proposition (summary)

**One control panel for how your shop actually runs** — your estimates, orders, inventory, and floor work on a **single map**, with **preview-before-write**, **approvals**, and **audit logs** so people (and AI) do not bypass your ERP with ad hoc scripts or open-ended chat.

You get **big-company discipline** — clear rules, evidence, and a path to add MES, QC, or warehouse tools **without replacing Odoo or rebuilding integrations from scratch**. Built for **small and mid manufacturers** and the integrators who deploy the same product with different bindings shop to shop.

**One line:** *See your shop in one place. Change systems safely. Add tools as peers — not another scary “ChatGPT plugged into production.”*

---

## Who it fits

| Segment | Why it clicks |
|--------|----------------|
| **Small / mid manufacturers** (job shops, tool makers, discrete manufacturing) | Already on **Odoo or similar ERP**; integrations are duct tape; someone tried **AI on live data** and leadership got nervous. |
| **Owner-operators and estimators** | Want **read estimates, preview writes, see the map** — not a data-science platform or a year-long SI program. |
| **Integrators and product builders** | Sell **repeatable deployments**: same control plane, new connector bindings per customer — not one-off Odoo customization forever. |

**Reference deployment:** carbide-tool manufacturing (credible anchor for discrete job-shop pain).

### How you buy it (two SKUs)

| Offer | Fit | Multi-tenant features | Price shape |
|-------|-----|------------------------|-------------|
| **SaaS** | Hosted; many shops on one platform | **Included** (when built) | Subscription |
| **Dedicated** | One plant / private stack | **Not included** | License + deploy (+ services) |

Same Ontology + AI hub either way — see [Product_Packaging_Tenancy](../Guides/Product_Packaging_Tenancy.md). Do not sell multi-tenant capabilities on a dedicated SKU (RISK-05).

---

## Buyer pain → answer (plain language)

| What they say | What you deliver |
|---------------|------------------|
| *“ChatGPT + Odoo is scary.”* | **Only approved actions run.** Preview writes, approve when it matters, track tasks and logs — a governed path, not free-form API access. |
| *“Nobody can explain our process in one place.”* | **Business map + process view** — one vocabulary for estimates, production, inventory, QC; same language for screens and automation. |
| *“We’ll add MES / QC / warehouse later.”* | **New systems plug in as connections** to the same map — you do not rewrite the ERP or rebuild the whole stack each time. |
| *“We can’t afford Palantir or a massive integration project.”* | **Serious guardrails at shop scale** — product-owned map, certified actions, audit trail — without enterprise platform cost or a large consultant bench. |
| *“Every AI vendor is just a copilot on our database.”* | **AI suggests; the panel executes** only through the same rules as your team — no shadow writes. |

---

## Market-friendly language (vs. internal terms)

Use this table in external copy; internal docs may keep precise architecture terms.

| Internal / doc term | Market-friendly |
|---------------------|-----------------|
| Foundry-shaped / ontology hub | **Single operating map for the shop** |
| Allowlisted skills | **Approved actions only** |
| Dry-run | **Preview before anything changes** |
| Peer edges / multi–system-of-action | **Plug in ERP, floor, QC, warehouse as you grow** |
| Connector catalog + bindings | **Pre-built links to Odoo (and the next system)** |
| Evidence / correlation | **Audit trail — who did what, when, on which record** |
| Re-bind ontology | **Same product, configured for the next customer** |

---

## Positioning vs. alternatives

| Alternative | Our angle |
|-------------|-----------|
| **AI + ERP plugin** | Safety and clarity first — map, preview, approve, log — not open-ended chat with write access. |
| **Big SI / iPaaS project** | Repeatable product + bindings, not custom spaghetti integration per site. |
| **Enterprise ontology platforms** | The **operating model** (one map, governed changes, room to grow) at **manufacturing SMB** scope and budget. |

**Claim boundary:** Positioning describes intent and wedge. Verified product claims follow SRD, scenarios, tests, and SRVM — same as [ControlPanelOntology_ConOps.md](./ControlPanelOntology_ConOps.md).

---

## Optional taglines

Pick tone by audience:

1. **Safety:** *Your ERP stays in charge. Your team (and AI) get a safe front door.*
2. **Clarity:** *One map of the shop. One way to change systems.*
3. **Growth:** *Start with Odoo. Add the floor and QC when you’re ready — same panel.*
4. **Integrator:** *Deploy once. Reconfigure for the next manufacturer.*

---

## Related docs

| Doc | Role |
|-----|------|
| [ControlPanelOntology_ConOps.md](./ControlPanelOntology_ConOps.md) | Actors, golden path, scope |
| [../Guides/Wedge_Demo_and_Replication.md](../Guides/Wedge_Demo_and_Replication.md) | Demo narrative and replication |
| [../TSD/Capability_Model.md](../TSD/Capability_Model.md) | What “robust enough to sell” means |
| [../Subsystem/Risks.md](../Subsystem/Risks.md) | Gaps and messaging risks (e.g. crowded “AI + ERP”) |
