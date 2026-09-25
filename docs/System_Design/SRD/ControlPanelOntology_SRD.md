# ControlPanelOntology — Software Requirements Document (SRD)

**Status:** Draft 0.3 (ontology hub + multi–system-of-action)  
**Source stories:** [ConOps](../ConOps/ControlPanelOntology_ConOps.md)  
**Verification:** [Scenarios](../Subsystem/SCENARIOS.md) · [TestPlans](../TestPlans/README.md) · [SRVM](../SRVM/ControlPanelOntology_SRVM.md)

SHALLs below are the **parent** product contract. Detail lives in each [SAC](../Subsystem/README.md) `SRD.md`.

**Architecture baseline:** the **ontology** is the hub. **Systems of action** (including ERP), data sources, and logic sources are **peer edges** reached through first-party connectors and allowlisted skills. ERP (Odoo today) is **connector peer #1**, not the sole system of record for every property.

**Scenario policy:** every OPS/E linked below stays **Open** until SRVM evidence closes it — progress or demos do not close requirements.

## SRD-SEC — Safety & governance

| ID | SHALL | Detail SAC |
|----|--------|------------|
| SRD-SEC-001 | The system SHALL run edge-changing work only through allowlisted skills (certified actions) resolved from ontology actions or known intents. | [SAC-001](../Subsystem/SAC-001/SRD.md), [SAC-004](../Subsystem/SAC-004/SRD.md) |
| SRD-SEC-002 | The system SHALL NOT let free-form natural language invent new tools, models, connectors, or payloads. | SAC-001, [SAC-003](../Subsystem/SAC-003/SRD.md) |
| SRD-SEC-003 | The system SHALL support dry-run (preview) for write skills that require it before commit. | [SAC-007](../Subsystem/SAC-007/SRD.md), SAC-004 |
| SRD-SEC-004 | The system SHALL record actor, correlation id, connector id (when applicable), and outcome for skill executions. | SAC-001, SAC-007 |
| SRD-SEC-005 | The system SHALL keep vendor field names and RPC shapes behind connectors (anti-corruption); public APIs use business vocabulary. | [SAC-005](../Subsystem/SAC-005/SRD.md) |

## SRD-UI — Control panel & consumption edges

| ID | SHALL | Detail SAC |
|----|--------|------------|
| SRD-UI-001 | The system SHALL provide a Map and section pages so operators can pick intents without guessing codes. | [SAC-002](../Subsystem/SAC-002/SRD.md) |
| SRD-UI-002 | The system SHALL provide Console, Tasks, and Logs for classify / queue / inspect work. | SAC-002, SAC-007 |
| SRD-UI-003 | The system SHALL provide `/ontology` with Schema, Explorer, Vertex, and Process map tabs. | SAC-002, [SAC-006](../Subsystem/SAC-006/SRD.md) |
| SRD-UI-004 | Analytics and workflow UIs SHALL consume ontology/skill APIs via the gateway — not browser-direct vendor APIs. | SAC-002, SAC-001 |

## SRD-TAX — Shared vocabulary (summary)

| ID | SHALL | Detail SAC |
|----|--------|------------|
| SRD-TAX-P-001 | The system SHALL publish a controlled taxonomy and known intent codes (`{domain}.{entity}.{verb}`). | [SAC-003](../Subsystem/SAC-003/SRD.md) |
| SRD-TAX-P-002 | Contract YAML SHALL be authored under SAC-003 Authoring and synced into `resources/packages/contracts`. | SAC-003 |

## SRD-EST — Estimates (wedge on ERP SoA peer)

| ID | SHALL | Detail SAC |
|----|--------|------------|
| SRD-EST-001 | The system SHALL read estimate rows via allowlisted skill `sales.estimate.read` through the ERP SoA connector when configured. | SAC-005 |
| SRD-EST-002 | Explorer SHALL list Estimate objects from that skill (or clear failure messaging). | SAC-006, SAC-005 |
| SRD-EST-003 | The system SHALL support find / persist / dismiss of estimate data issues in the control plane without free-form edge writes (runtime: see Risks GAP-02). | [SAC-008](../Subsystem/SAC-008/SRD.md) |

## SRD-ONT — Business map (ontology hub)

| ID | SHALL | Detail SAC |
|----|--------|------------|
| SRD-ONT-001 | The system SHALL expose a product-owned entity catalog (types, properties, links, actions) as the hub for edge interaction. | SAC-006 |
| SRD-ONT-002 | Schema tab SHALL let operators search and inspect types without editing YAML in the browser (v1). | SAC-006 |
| SRD-ONT-003 | Vertex SHALL let operators seed a type and Search Around along declared links. | SAC-006 |
| SRD-ONT-004 | Process map SHALL show the curated Estimate→…→Shipping spine (not every link). | SAC-006 |
| SRD-ONT-005 | Ontology actions SHALL resolve to allowlisted skills and owning connectors via bindings — not hard-coded to a single SoA. | SAC-006, SAC-004, SAC-005 |

## SRD-CONN — Connectors (multi-edge)

| ID | SHALL | Detail SAC |
|----|--------|------------|
| SRD-CONN-001 | The system SHALL provide a first-party connector catalog; Odoo SHALL be the first **system-of-action** peer (`connector_id=odoo`) with health and live/simulate modes. | SAC-005 |
| SRD-CONN-002 | Additional systems of action, data sources, and logic sources SHALL appear only as product-owned first-party connectors (customers configure; they do not upload adapters). | SAC-005 |
| SRD-CONN-003 | The system SHALL support per-property (or per-binding) ownership so ERP is not assumed to own every field on every type. | SAC-005, SAC-006 |
| SRD-CONN-004 | Each connector SHALL declare which skill codes it supports; the UI/allowlist SHALL NOT offer a skill as executable without a capable enabled connector (or explicit simulate path). | SAC-005, SAC-001 |

## SRD-EDGE — Edge interaction families (summary)

| ID | SHALL | Primary scenarios |
|----|--------|-------------------|
| SRD-EDGE-001 | Operators SHALL be able to act on ontology objects targeting **any** enabled SoA peer through the skills path. | OPS-013 |
| SRD-EDGE-002 | Admins SHALL be able to configure and health-check SoA connectors beyond ERP using the same catalog pattern. | OPS-014 |
| SRD-EDGE-003 | Product-owned data-source connectors SHALL bind into ontology properties without exposing raw source payloads in public catalog APIs. | OPS-015 |
| SRD-EDGE-004 | Logic-source execution SHALL occur only as ontology action → allowlisted skill → logic connector. | OPS-016 |
| SRD-EDGE-005 | Automations SHALL trigger the same allowlisted skill path as humans (with approval when required). | OPS-018 |
| SRD-EDGE-006 | External apps/SDKs SHALL call the control-plane gateway APIs — not raw vendor RPC with embedded shop credentials. | OPS-019 |
| SRD-EDGE-007 | AI helpers MAY suggest known intents; they SHALL NOT execute outside allowlisted skills. | OPS-020 |

Detail allocation: SAC-001…007 as traced in scenario files.

## SRD-OPS — Operations

| ID | SHALL | Detail SAC |
|----|--------|------------|
| SRD-OPS-001 | The system SHALL queue tasks and support approve/reject where policy requires. | SAC-007 |
| SRD-OPS-002 | The system SHALL store structured logs reachable from the Logs UI. | SAC-007 |
| SRD-OPS-003 | Operators SHALL have a documented path to start the control-plane stack (Compose / host apps); edges remain external. | [SAC-009](../Subsystem/SAC-009/SRD.md) |

## SRD-ARCH — Architecture invariants (robust enough)

Detail: [Capability_Model](../TSD/Capability_Model.md). These SHALLs hold even when only the ERP SoA peer is live.

| ID | SHALL | Detail |
|----|--------|--------|
| SRD-ARCH-001 | Edge execution SHALL resolve to allowlisted skills and a capable `connector_id` from the product connector catalog — not hard-coded to a single peer. | SAC-004, SAC-005, SAC-006 |
| SRD-ARCH-002 | The product SHALL support ontology exploration and governed reads **without** a central twin store of all peer rows (federated reads via skills). | SAC-006; GAP-01 deferred |
| SRD-ARCH-003 | Ontology language and bindings SHALL remain product-owned; another deployment SHALL be supported by rebinding packages and connectors without customer browser ontology authoring (GAP-03 deferred). | SAC-006, SAC-003 |
| SRD-ARCH-004 | The connector catalog SHALL declare peer kind (SoA / data / logic) and supported skills; the catalog SHALL allow architecture stubs (e.g. simulate-only peers) before live second SoA ships. | SAC-005; GAP-09…11 |

## SRD-TEN — Packaging & tenancy (SaaS vs dedicated)

Commercial offers of the **same** Ontology + AI hub. Detail: [Product_Packaging_Tenancy](../Guides/Product_Packaging_Tenancy.md). Full multi-tenant data isolation is **specified**; implementation/TR remain Open (GAP-13).

| ID | SHALL | Detail |
|----|--------|--------|
| SRD-TEN-001 | The product SHALL support a **dedicated single-tenant** offer where multi-tenant features are **not** entitled (no tenant switcher, no cross-tenant access, no multi-shop platform admin). | Offer B · OPS-023 · SAC-009 |
| SRD-TEN-002 | The product SHALL support a **SaaS multi-tenant** offer where multi-tenant features **are** entitled (tenant context; isolation and admin when verified). | Offer A · OPS-024 · SAC-009 |
| SRD-TEN-003 | Deployment configuration SHALL select tenancy mode via environment (or equivalent GitHub / Azure variables), including at least `DEPLOYMENT_MODE` and `TENANT_ID`. | [Deployment_Tenancy_Env](../Subsystem/SAC-009/Guides/Deployment_Tenancy_Env.md) |
| SRD-TEN-004 | Pricing / SKU differences between SaaS and dedicated SHALL map to **entitlements** (feature availability), not to a forked control-plane product. | Commercial + RISK-05 |

## SRD-CI — Quality gates (summary)

Detail: [SAC-010](../Subsystem/SAC-010/SRD.md). Markdown lint on PR is required; contracts/ontology smokes are required on the release checklist; expanding CI jobs is planned. Release SHALL NOT mark OPS/E closed without evidence ([E-05](../Subsystem/SAC-010/Scenarios/E-05.md), [E-06](../Subsystem/SAC-010/Scenarios/E-06.md)).

## Trace (summary)

| SHALL group | Primary scenarios (all Open until SRVM closes) |
|-------------|--------------------------------------------------|
| SRD-EST / SRD-CONN-001 | [OPS-001](../Subsystem/SAC-005/Scenarios/OPS-001.md) |
| SRD-SEC-003 | [OPS-002](../Subsystem/SAC-007/Scenarios/OPS-002.md) |
| SRD-OPS-001 | [OPS-003](../Subsystem/SAC-007/Scenarios/OPS-003.md) |
| SRD-ONT Schema | [OPS-004](../Subsystem/SAC-006/Scenarios/OPS-004.md) |
| SRD-EST-002 | [OPS-005](../Subsystem/SAC-006/Scenarios/OPS-005.md) |
| SRD-ONT-003 | [OPS-006](../Subsystem/SAC-006/Scenarios/OPS-006.md) |
| SRD-OPS-003 | [OPS-007](../Subsystem/SAC-009/Scenarios/OPS-007.md) |
| Skills engine | [OPS-008](../Subsystem/SAC-004/Scenarios/OPS-008.md) |
| SRD-UI-001 | [OPS-009](../Subsystem/SAC-002/Scenarios/OPS-009.md) |
| Taxonomy | [OPS-010](../Subsystem/SAC-003/Scenarios/OPS-010.md) |
| SRD-EST-003 | [OPS-011](../Subsystem/SAC-008/Scenarios/OPS-011.md) |
| Allowlist | [OPS-012](../Subsystem/SAC-001/Scenarios/OPS-012.md) |
| SRD-EDGE-001 / SRD-ONT-005 | [OPS-013](../Subsystem/SAC-004/Scenarios/OPS-013.md) |
| SRD-EDGE-002 / SRD-CONN-002 | [OPS-014](../Subsystem/SAC-005/Scenarios/OPS-014.md) |
| SRD-EDGE-003 | [OPS-015](../Subsystem/SAC-005/Scenarios/OPS-015.md) |
| SRD-EDGE-004 | [OPS-016](../Subsystem/SAC-004/Scenarios/OPS-016.md) |
| SRD-UI-004 | [OPS-017](../Subsystem/SAC-002/Scenarios/OPS-017.md) |
| SRD-EDGE-005 | [OPS-018](../Subsystem/SAC-007/Scenarios/OPS-018.md) |
| SRD-EDGE-006 | [OPS-019](../Subsystem/SAC-001/Scenarios/OPS-019.md) |
| SRD-EDGE-007 / SRD-SEC-002 | [OPS-020](../Subsystem/SAC-003/Scenarios/OPS-020.md) |
| SRD-ONT-004 | [OPS-021](../Subsystem/SAC-006/Scenarios/OPS-021.md) |
| SRD-CONN-003 | [OPS-022](../Subsystem/SAC-006/Scenarios/OPS-022.md) |
| SRD-ARCH-001 … 004 | [Capability_Model](../TSD/Capability_Model.md) · OPS-013…016, 022 | Inspection / Test (staged) |
| SRD-TEN-001 … 004 | [OPS-023](../Subsystem/SAC-009/Scenarios/OPS-023.md) · [OPS-024](../Subsystem/SAC-009/Scenarios/OPS-024.md) | Inspection / Test (staged) |
| Lifecycle | [E-01](../Subsystem/Scenarios/E-01.md) … [E-08](../Subsystem/Scenarios/E-08.md) |

## Related

- [Capability_Model](../TSD/Capability_Model.md)  
- [Parent TSD](../TSD/ControlPanelOntology_TSD.md)  
- [Risks](../Subsystem/Risks.md)  
- [Component_Map](../TSD/Component_Map.md)  
- [ConOps](../ConOps/ControlPanelOntology_ConOps.md)  
