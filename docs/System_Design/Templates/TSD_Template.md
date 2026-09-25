# Technical Specifications Document (TSD) Template

**Document type:** TSD  
**Template version:** 1.1  
**Product defaults:** ControlPanelOntology — design the **ontology hub** and **connector catalog**; ERP is SoA peer #1.

```text
ConOps  →  what happens in real life
SRD     →  what the system SHALL do
TSD     →  how we design/build it
Test / SRVM → how we prove (scenarios stay Open until evidence)
```

**Agent rule:** before changing implementation code, read [../TSD/Pattern_Selection.md](../TSD/Pattern_Selection.md), then one linked pattern file.

---

## Document control

| Field | Value |
|-------|--------|
| **Document title** | ControlPanelOntology — TSD (parent / SAC-xxx) |
| **TSD scope** | Parent (system) / Child (SAC-xxx) |
| **Version** | 0.1 |
| **Status** | Draft / In review / Baseline |
| **Parent ConOps** | |
| **Parent SRD** | |
| **Subsystem** *(child)* | SAC-xxx |
| **Owns scenarios** | OPS-… / E-… |

### Revision history

| Date | Version | Description | Author(s) |
|------|---------|-------------|-----------|
| | 0.1 | Initial TSD from template | |

---

## 1. Purpose

Technical design so developers implement SRDs, integrators know interfaces, and testers know the build under test.

---

## 2. Scope

**In:** architecture, components, interfaces, data, security placement, deployment, SRD→design map.  
**Out:** ConOps storytelling, SHALLs, test steps, SRVM status.

---

## 3. Design overview

**One paragraph:** hub + peers + this SAC’s role.

### Context diagram

```text
  Consumers (UI · AI · SDK · automations)
        │
        ▼
  Gateway (PEP / allowlist / BFF)
        │
   Ontology hub ──► Skills facade
        │                │
        │                ▼
        │         Connector catalog
        │          ├─ SoA peers (ERP first)
        │          ├─ Data peers
        │          └─ Logic peers
        ▼
  Control-plane Postgres (not an edge twin)
```

Parent annotated map: [../TSD/Component_Map.md](../TSD/Component_Map.md).

---

## 4. Architecture

### 4.1 Style

e.g. BFF gateway + hexagonal orchestrator + first-party adapters — why.

### 4.2 Patterns

Only patterns that address a real risk. Start at [Pattern_Selection](../TSD/Pattern_Selection.md).

| Pattern | Risk addressed | Library link | Realization |
|---------|----------------|--------------|-------------|
| | | | |

**Deferred patterns:** explicit non-choices for v1.

### 4.3 Major components

| Component ID | Name | Responsibility | Hosts |
|--------------|------|----------------|-------|
| C-001 | | | |

### 4.4 Subsystem allocation *(parent)*

| SAC | Role | Primary SRD | Owns scenarios |
|-----|------|-------------|----------------|
| SAC-001 | Gateway / API face | SRD-SEC / EDGE-006 | OPS-012, 019 |
| SAC-005 | Connector catalog | SRD-CONN | OPS-001, 014, 015 |
| SAC-006 | Ontology hub | SRD-ONT | OPS-004…006, 021, 022 |
| … | | | |

### 4.5 Technology choices

| Concern | Choice | Notes |
|---------|--------|-------|
| UI | Next.js | talks to Nest only |
| Gateway | NestJS BFF | sole app entry |
| Skills | FastAPI orchestrator | internal |
| Ontology / contracts | `resources/packages/*` | product-owned YAML |
| CP data | Postgres | ≠ edge DBs |
| Runtime | Compose | edges external via env URLs |

---

## 5. Action → skill → connector *(when this TSD owns execute path)*

| Step | Design |
|------|--------|
| Resolve | Ontology action or known intent → skill code |
| Enforce | Gateway PEP + orchestrator allowlist |
| Own | Binding / capability → `connector_id` (not hard-coded sole SoA) |
| Run | Port → peer adapter; evidence includes `connector_id` |
| Public API | Business DTOs only (ACL) |

---

## 6. Connector catalog SPI *(SAC-005 / parent)*

| Field | Design |
|-------|--------|
| `connector_id` | Stable id |
| `kind` | `soa` \| `data` \| `logic` |
| Capabilities | Declared skill codes |
| Health | `ok` \| `degraded` \| `down` |
| Bindings | `bindings/<connector_id>/` ACL-only |
| Shipping | First-party only |

---

## 7. Detailed design by component / SAC

**Purpose / Implements SRD IDs / Behavior / Errors / Observability**

---

## 8. Interfaces

### External (edges)

| IF ID | Edge | Kind | Protocol | Auth | SRD |
|-------|------|------|----------|------|-----|
| IF-001 | Odoo | SoA | JSON-RPC | | |

### Internal

| IF ID | From → To | Contract | SRD |
|-------|-----------|----------|-----|
| | Web → Gateway | HTTPS | |

Clients must **not** hold edge credentials or call vendor APIs directly.

---

## 9. Data design

| Entity | Description | Owner | Notes |
|--------|-------------|-------|-------|
| Ontology entity type | Product YAML | SAC-006 | Hub |
| Task / evidence | Control plane | SAC-007 | |
| Connector config | CP Postgres | SAC-005 | Mask secrets |

**Do not** twin edge databases in the control plane (unless a deferred GAP says otherwise).

---

## 10. Security design

| Topic | Approach | SRD |
|-------|----------|-----|
| Allowlist / PEP | Gateway | SRD-SEC |
| ACL | Adapters + bindings | SRD-SEC-005 |
| Secrets | Env → vault later | |
| Dry-run / approval | SAC-007 | SRD-SEC-003 |

---

## 11. Deployment design

```text
Control-plane Compose (postgres, gateway, orch, web)
    → Edges via ODOO_* / future peer env URLs (not in Compose)
```

**Rollback:** defined for CP only; does not migrate SoA data.

Related E scenarios: E-04 (deploy), E-05/E-06 (release gates).

---

## 12. Requirements → design traceability

| SRD ID | Design element | Primary scenario (Open) |
|--------|----------------|-------------------------|
| | | OPS-… / E-… |

---

## 13. As-built / open technical decisions

| ID | Topic | Options | Owner |
|----|-------|---------|-------|
| TD-001 | | | |

---

## 14. Summary

- Architecture:  
- Peers in catalog:  
- Ready for implementation: Yes / No  

## Appendix — Parent vs child

| Type | Contains |
|------|----------|
| **Parent TSD** | Hub principles, SPI, edge family allocation, SAC index |
| **Child TSD** | Deep design for one SAC; links SRD + owned scenarios |

---

*End of TSD template*
