# Gap 07 — Geospatial maps

**Status:** deferred by design

Palantir-style **map layouts**: when location matters, objects sit on **geography** — a different axis than ERP process order (Estimate → Quote → SO).

## What we have

- No geospatial properties or map canvas in the ontology Language
- Process / schema views only (logical business space)

## What we don’t have

- Geo properties on entity types (lat/lng, site, region)
- Map tile canvas with ontology objects as pins/layers
- Saved map layouts tied to object types or explorations
- Geo filters in Object Explorer ([Gap 05](./05-object-explorer-instances.md))

## Why deferred

Tool-manufacturing ERP wedge is process- and document-centric. Geospatial pays off for plants, fleets, field service, or multi-site logistics — not for the first catalog.

## Unblock later when

- A connector or skill needs site/region as a first-class noun, or
- Customers run multi-plant / field operations on the control plane

## Related

- [Gap 05 — Object Explorer](./05-object-explorer-instances.md)
- [ontology.md](../Development/ontology.md)
