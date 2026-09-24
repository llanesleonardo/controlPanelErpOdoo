# Screens — what you see in the control panel

The web app (`apps/web`) is organized around **shop work**, not raw ERP menus.

## Main areas

| Screen | What you do there |
|--------|-------------------|
| **ERP Map** (home) | Pick a domain / intent without memorizing skill codes |
| **Ontology** | Business map: Schema · Explorer · Vertex · Process map — see [Business map](../Business_map/README.md) |
| **Request console** | Type or pick an intent; choose dry-run vs commit when allowed |
| **Tasks** | See pending / running / completed / needs approval; open a task for detail |
| **Logs** | Follow a correlation id from a request through outcomes |
| **Integrations (Odoo)** | Point at your ERP, test health — see [Connect ERP](../Connect_ERP/README.md) |
| **Theme** | Dark / light preference |

## Typical flow

1. Open the map or console.  
2. Prefer **dry-run** when you are unsure.  
3. If a task needs approval, a lead opens **Tasks** and accepts or rejects.  
4. Use **Logs** if something fails and you need the trail.

## Practice

- Read estimates: [OPS-001](../../System_Design/Subsystem/SAC-005/Scenarios/OPS-001.md)  
- Dry-run a write: [OPS-002](../../System_Design/Subsystem/SAC-007/Scenarios/OPS-002.md)  
- Approve a task: [OPS-003](../../System_Design/Subsystem/SAC-007/Scenarios/OPS-003.md)  

## For builders

Requirements and design: [SAC-002](../../System_Design/Subsystem/SAC-002/README.md) · App: [`apps/web`](../../../apps/web/README.md)
