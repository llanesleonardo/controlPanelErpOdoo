# ControlPanelERP — Concept of Operations (ConOps)

**Status:** Draft 0.1  
**Audience:** shop owner, estimator, floor lead, and the team building the control panel

## 1. What this product is

Your company makes **carbide tools**. You already use an **ERP** (today: Odoo) for customers, estimates, orders, inventory, manufacturing, quality, people time, drawings/documents, and shipping.

The **control panel** is a separate app. It does **not** replace the ERP. It lets people (and later helpers like OpenClaw) ask for work in clear business terms — then runs only **approved skills** against the ERP, with logs and evidence.

Think of it as a **safe remote control** for the ERP: preview risky changes, approve when needed, and keep a paper trail.

## 2. Who uses it

| Role | What they need |
|------|----------------|
| Estimator / sales | Read estimates, open sales intents, browse the business map |
| Buyer / inventory | Later: purchase and stock skills (catalog today; live later) |
| Production / machines | Later: manufacturing and shop-floor skills |
| Quality / drawings | Later: quality checks and controlled documents |
| Shipping | Later: ship / deliver skills; ERP stays the source of truth |
| Admin / IT | Connect ERP credentials, watch logs and tasks |

## 3. A normal job flow (shop story)

1. Customer asks for a carbide tool (often with a drawing).  
2. Shop creates an **estimate**, then a **quote**, then a **sales order** in the ERP.  
3. If material is missing, a **purchase order** is placed and stock is **received**.  
4. **Manufacturing** runs on machines; people clock time.  
5. **Inspection** checks the part; documents stay controlled.  
6. Job is **shipped** from your dock or a third-party carrier.  

The control panel’s **Process map** shows that spine in simple pictures. The **Schema** tab lists business types. **Explorer** can pull live estimate rows today. **Vertex** lets you expand related types without dumping every link at once.

## 4. Golden rules (easy to remember)

1. The ERP (or other system of record) **owns the real data**.  
2. Natural language may **suggest** an intent — it must **not** invent new ERP calls.  
3. Only **allowlisted skills** may run (certified actions).  
4. Risky writes get a **dry-run** (preview) first when required.  
5. Important changes can need a **human approval**.  
6. Every run leaves a **correlation id**, logs, and evidence when applicable.  

## 5. What “ontology” means here

**Ontology** = our shared business map: nouns (Estimate, Inventory item, …), links between them, and allowed verbs (actions) tied to skills.  
You browse it in `/ontology`. You do **not** invent new types in the browser in v1 — the product team ships the map as YAML.

## 6. Boundaries

| In scope | Out of scope (for now) |
|----------|-------------------------|
| Governed skills into first-party connectors | Replacing Odoo UI |
| Control-plane users, tasks, logs, evidence | Full digital twin of every ERP row |
| Ontology Schema / Explorer / Vertex / Process | Customer-built ontology editors |
| Docker Compose for local/Linux | Geospatial maps / no-code Workshop builder |

## 7. Related

- Requirements: [../SRD/ControlPanelERP_SRD.md](../SRD/ControlPanelERP_SRD.md)  
- Design: [../TSD/ControlPanelERP_TSD.md](../TSD/ControlPanelERP_TSD.md)  
- Subsystems: [../Subsystem/README.md](../Subsystem/README.md)  
- Risks: [../Subsystem/Risks.md](../Subsystem/Risks.md)  
