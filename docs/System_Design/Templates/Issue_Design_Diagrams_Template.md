# Issue design diagrams template — ControlPanelOntology

**Template version:** 1.1  
**When:** Before implementing a GitHub issue.  
**Where:** `docs/System_Design/Subsystem/SAC-xxx/Issues/GH-NNN-slug/`

Diagrams must reflect the **ontology hub** and **connector catalog**. **ERP (Odoo) is one SoA peer** — hard-code it only when the issue is the Odoo wedge.

Related scenario stays **Open** until TR + SRVM (issue progress ≠ scenario closure).

---

## README.md

```markdown
# GH-NNN — <title>

| Field | Value |
|-------|--------|
| **GitHub** | https://github.com/llanesleonardo/controlPanelErpOdoo/issues/NNN |
| **Primary SAC** | SAC-xxx |
| **Also involves** | … |
| **Related OPS/E** | OPS-… / E-… (**Open**) |
| **SRD** | SRD-… |
| **Edges** | SoA / data / logic / none |

## Diagrams

| Diagram | File |
|---------|------|
| Flow | [flow.md](flow.md) |
| Activity | [activity.md](activity.md) |
| Sequence | [sequence.md](sequence.md) |
| Class | [class.md](class.md) |

## Scope (from issue)

- …
```

---

## flow.md

End-to-end path (happy path + key failures). Prefer ontology action → skill → owning connector.

````markdown
# GH-NNN — Flow diagram

```mermaid
flowchart TD
  Start([Start]) --> Act[Ontology_action_or_intent]
  Act --> Allow{Allowlisted}
  Allow -->|no| Fail[Honest_reject]
  Allow -->|yes| Cat[Connector_catalog]
  Cat --> Edge[Peer_edge]
  Edge -->|ok| Ok[Success]
  Edge -->|fail| Fail
  Ok --> Stop([Stop])
  Fail --> Stop
```
````

---

## activity.md

UML **activity** semantics. Mermaid `activityDiagram` is **not** supported on GitHub/Cursor — use `flowchart` + swimlanes.

````markdown
# GH-NNN — Activity diagram

```mermaid
flowchart TB
  Start([start])
  subgraph Operator
    A1([Trigger scenario])
  end
  subgraph ControlPlane
    S1{Policy ok}
    S2([Run via ontology or skill])
    S3([Honest reject])
  end
  subgraph Edges
    E1([Peer connector call])
  end
  Stop([stop])
  Start --> A1 --> S1
  S1 -->|yes| S2 --> E1 --> Stop
  S1 -->|no| S3 --> Stop
```
````

---

## sequence.md

````markdown
# GH-NNN — Sequence diagram

```mermaid
sequenceDiagram
  autonumber
  actor User
  participant Gw as NestJS Gateway
  participant Onto as Ontology hub
  participant Orch as FastAPI Orchestrator
  participant Cat as Connector catalog
  participant Edge as Peer edge SoA/data/logic
  User->>Gw: request ontology action / skill
  Gw->>Onto: resolve type action binding
  Gw->>Orch: allowlisted skill
  Orch->>Cat: owning connector
  Cat->>Edge: ACL call
  Edge-->>Cat: result
  Cat-->>Orch: domain DTO
  Orch-->>Gw: evidence
  Gw-->>User: response
```

Note: **ERP (Odoo) is one SoA peer** inside the catalog — not a hard-coded sole target unless this issue is specifically the Odoo wedge.
````

---

## class.md

Prefer a **component** flowchart when UML classes are not yet known.

````markdown
# GH-NNN — Class / component diagram

```mermaid
flowchart TB
  UI[Web_UI] --> GW[NestJS_Gateway]
  GW --> Onto[Ontology_hub]
  GW --> Orch[Orchestrator]
  Orch --> Cat[Connector_catalog]
  Cat --> SoA[SoA_peers]
  Cat -.-> Data[Data_peers]
  Cat -.-> Logic[Logic_peers]
  SoA --> ERP[ERP_Odoo_peer]
```
````

---

*End of issue design diagrams template*
