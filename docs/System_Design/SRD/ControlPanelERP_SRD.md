# ControlPanelERP — Software Requirements Document (SRD)

**Status:** Draft 0.2 (epic harvest complete)  
**Source stories:** [ConOps](../ConOps/ControlPanelERP_ConOps.md)  
**Verification:** [Scenarios](../Subsystem/SCENARIOS.md) · [TestPlans](../TestPlans/README.md)

SHALLs below are the **parent** product contract — written so a shop person can understand them. Detailed numbered requirements live in each [SAC](../Subsystem/README.md) `SRD.md` (promoted from legacy Epic packs).

## SRD-SEC — Safety & governance

| ID | SHALL | Detail SAC |
|----|--------|------------|
| SRD-SEC-001 | The system SHALL run ERP-changing work only through allowlisted skills (certified actions). | [SAC-001](../Subsystem/SAC-001/SRD.md), [SAC-004](../Subsystem/SAC-004/SRD.md) |
| SRD-SEC-002 | The system SHALL NOT let free-form natural language invent new tools, models, or payloads. | SAC-001, [SAC-003](../Subsystem/SAC-003/SRD.md) |
| SRD-SEC-003 | The system SHALL support dry-run (preview) for write skills that require it before commit. | [SAC-007](../Subsystem/SAC-007/SRD.md), SAC-004 |
| SRD-SEC-004 | The system SHALL record actor, correlation id, and outcome for skill executions. | SAC-001, SAC-007 |
| SRD-SEC-005 | The system SHALL keep vendor ERP field names behind the connector (anti-corruption). | [SAC-005](../Subsystem/SAC-005/SRD.md) |

## SRD-UI — Control panel

| ID | SHALL | Detail SAC |
|----|--------|------------|
| SRD-UI-001 | The system SHALL provide an ERP Map and section pages so operators can pick intents without guessing codes. | [SAC-002](../Subsystem/SAC-002/SRD.md) |
| SRD-UI-002 | The system SHALL provide Console, Tasks, and Logs for classify / queue / inspect work. | SAC-002, SAC-007 |
| SRD-UI-003 | The system SHALL provide `/ontology` with Schema, Explorer, Vertex, and Process map tabs. | SAC-002, [SAC-006](../Subsystem/SAC-006/SRD.md) |

## SRD-TAX — Shared vocabulary (summary)

| ID | SHALL | Detail SAC |
|----|--------|------------|
| SRD-TAX-P-001 | The system SHALL publish a controlled taxonomy and known intent codes (`{domain}.{entity}.{verb}`). | [SAC-003](../Subsystem/SAC-003/SRD.md) |
| SRD-TAX-P-002 | Contract YAML SHALL be authored under SAC-003 Authoring and synced into `resources/packages/contracts`. | SAC-003 |

## SRD-EST — Estimates (wedge)

| ID | SHALL | Detail SAC |
|----|--------|------------|
| SRD-EST-001 | The system SHALL read live estimate rows from the ERP via skill `sales.estimate.read` when configured. | SAC-005 |
| SRD-EST-002 | Explorer SHALL list Estimate objects from that live skill (or clear failure messaging). | SAC-006, SAC-005 |
| SRD-EST-003 | The system SHALL support find / persist / dismiss of estimate data issues in the control plane without free-form ERP writes (runtime: see Risks GAP-02). | [SAC-008](../Subsystem/SAC-008/SRD.md) |

## SRD-ONT — Business map (ontology)

| ID | SHALL | Detail SAC |
|----|--------|------------|
| SRD-ONT-001 | The system SHALL expose a product-owned entity catalog (types, properties, links, actions). | SAC-006 |
| SRD-ONT-002 | Schema tab SHALL let operators search and inspect types without editing YAML in the browser (v1). | SAC-006 |
| SRD-ONT-003 | Vertex SHALL let operators seed a type and Search Around along declared links. | SAC-006 |
| SRD-ONT-004 | Process map SHALL show the curated Estimate→…→Shipping spine (not every link). | SAC-006 |

## SRD-CONN — Connectors

| ID | SHALL | Detail SAC |
|----|--------|------------|
| SRD-CONN-001 | Odoo SHALL be connector #1 with health and live/simulate modes. | SAC-005 |
| SRD-CONN-002 | New systems SHALL appear only as product-owned first-party connectors. | SAC-005 |

## SRD-OPS — Operations

| ID | SHALL | Detail SAC |
|----|--------|------------|
| SRD-OPS-001 | The system SHALL queue tasks and support approve/reject where policy requires. | SAC-007 |
| SRD-OPS-002 | The system SHALL store structured logs reachable from the Logs UI. | SAC-007 |
| SRD-OPS-003 | Operators SHALL have a documented path to start the control-plane stack (Compose / host apps). | [SAC-009](../Subsystem/SAC-009/SRD.md) |

## SRD-CI — Quality gates (summary)

Detail: [SAC-010](../Subsystem/SAC-010/SRD.md). Markdown lint on PR is required; contracts/ontology smokes are required on the release checklist; expanding CI jobs is planned.

## Trace (summary)

| SHALL group | Primary scenarios |
|-------------|-------------------|
| SRD-EST-001 / SRD-CONN | [OPS-001](../Subsystem/SAC-005/Scenarios/OPS-001.md) |
| SRD-SEC-003 / dry-run | [OPS-002](../Subsystem/SAC-007/Scenarios/OPS-002.md) |
| SRD-OPS-001 | [OPS-003](../Subsystem/SAC-007/Scenarios/OPS-003.md) |
| SRD-ONT / Schema | [OPS-004](../Subsystem/SAC-006/Scenarios/OPS-004.md) |
| SRD-EST-002 / Explorer | [OPS-005](../Subsystem/SAC-006/Scenarios/OPS-005.md) |
| SRD-ONT-003 / Vertex | [OPS-006](../Subsystem/SAC-006/Scenarios/OPS-006.md) |
| SRD-OPS-003 / deploy | [OPS-007](../Subsystem/SAC-009/Scenarios/OPS-007.md) |
| Skills engine | [OPS-008](../Subsystem/SAC-004/Scenarios/OPS-008.md) |
| SRD-UI-001 / Map | [OPS-009](../Subsystem/SAC-002/Scenarios/OPS-009.md) |
| Taxonomy resolve | [OPS-010](../Subsystem/SAC-003/Scenarios/OPS-010.md) |
| SRD-EST-003 / issues | [OPS-011](../Subsystem/SAC-008/Scenarios/OPS-011.md) |
| Allowlist / rate limit | [OPS-012](../Subsystem/SAC-001/Scenarios/OPS-012.md) |
| Pack alignment | [E-01](../Subsystem/Scenarios/E-01.md) · SAC-010 |

## Related

- [Parent TSD](../TSD/ControlPanelERP_TSD.md)  
- [Risks](../Subsystem/Risks.md)  
- History only (do not author here): [`_legacy/Epic-*`](../_legacy/)  
