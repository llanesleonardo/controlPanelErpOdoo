# Risks and gaps

Intentional open items — **not bugs**. Written for the shop + builders.

| ID | Topic | Status | Residual |
|----|-------|--------|----------|
| **GAP-01** | Full graph engine (live twin of every ERP row) | **Deferred** | Instance store, CDC, path queries |
| **GAP-02** | Estimate-issues find / persist / dismiss runtime | **Deferred** | Code + UI (docs exist under `_legacy/Epic-06`) |
| **GAP-03** | Customer-authored ontology | **Deferred** | Tenant editors / marketplace — v1 stays product-owned |
| **GAP-04** | Ontology Manager (Schema) | **Satisfied (v1 slice)** | Browser authoring, icon registry field, binding inspector, publish gates |
| **GAP-05** | Object Explorer | **Satisfied (v1 slice)** | Cross-type index, instance links, more live reads, server layouts |
| **GAP-06** | Vertex Search Around | **Satisfied (v1 slice)** | Instance seed, style-by-property, shared server templates, simulation |
| **GAP-07** | Geospatial maps | **Deferred** | Site/region on objects + map canvas |
| **GAP-08** | Workshop / Quiver-style builders | **Deferred** | No-code apps / chart studio |

## What “Satisfied (v1 slice)” means

You can already use Schema, Explorer (live estimates), and Vertex on `/ontology`. What’s left is the **full** Palantir-scale version — not that the first slice is missing.

## Related

- [ConOps](../ConOps/ControlPanelERP_ConOps.md)  
- [SAC-006 Ontology](./SAC-006/README.md)  
