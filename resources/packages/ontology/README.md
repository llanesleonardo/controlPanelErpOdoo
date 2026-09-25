# @control-panel-ontology/ontology

Business map package — entity types, links, actions → taxonomy skills, plus connector bindings.

```bash
npm test -w @control-panel-ontology/ontology
```

Public catalog helpers omit vendor bindings. Vendor field maps live under `bindings/<connector_id>/`.

| Path | Role |
|------|------|
| `entity-types/*.yaml` | Hub vocabulary (product-owned) |
| `bindings/<connector_id>/*.yaml` | ACL-side maps (not on public API) |
| `catalog/connectors.yaml` | First-party peer catalog (SoA / data / logic) — multi-edge proof ladder |

See [SAC-006](../../../docs/System_Design/Subsystem/SAC-006/README.md), [Capability_Model](../../../docs/System_Design/TSD/Capability_Model.md), and the [System Design pack](../../../docs/System_Design/README.md).
