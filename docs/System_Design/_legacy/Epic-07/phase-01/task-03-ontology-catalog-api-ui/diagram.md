# Ontology catalog API + UI — diagram

```mermaid
flowchart LR
  UI["/ontology"]
  GW["GET /ontology"]
  Pkg[packages_ontology]
  UI --> GW
  GW --> Pkg
```
