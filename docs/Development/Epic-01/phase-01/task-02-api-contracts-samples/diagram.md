# API contracts samples — Diagrams

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
flowchart TD
  IntentAPI[Intent_API]
  TaskAPI[Task_API]
  SkillAPI[Skill_API]
  AuditAPI[Audit_Incident_API]
  YAML[ContractsDocs_YAML]
  IntentAPI --> YAML
  TaskAPI --> YAML
  SkillAPI --> YAML
  AuditAPI --> YAML
```

Four contract types share common schemas; domain YAML files specialize operations.
