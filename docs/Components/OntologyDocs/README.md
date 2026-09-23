# OntologyDocs

Product surface for the **Ontology Language** — business entity types, properties, links, and actions that map to certified skills.

## Principles

- Humans and agents share the same ontology vocabulary  
- UI/agents never see vendor model names (`customer.estimate` stays in connector ACL)  
- Actions execute only through allowlisted skills ([governed-execution](../../Development/governed-execution.md))  
- Product-owned Language; customers do not author ontology in v1  
- Browser: `/ontology` — React Flow object map + detail panel (does not replace ERP Map)
- Edit Language via product-owned YAML under `packages/ontology/` (see [ontology.md](../../Development/ontology.md#how-to-modify-the-language-v1))

## Tool manufacturing catalog (from circled ERP apps)

| Entity type | ERP section | Notes |
|-------------|-------------|--------|
| `Contact` | Contacts | Can `create_estimate`; Estimate cannot create Contact |
| `Estimate` | Estimates | Linked to Contact; live `sales.estimate.read` |
| `Quote` | Quotes | Formal quote from / with Estimate |
| `SalesOrder` | Sales | Downstream of Quote |
| `InventoryItem` | Inventory | Materials & finished tools |
| `PurchaseOrder` | Purchase | Vendor = Contact |
| `ManufacturingOrder` | Manufacturing | Builds InventoryItem |
| `ShopFloorJob` | Shop Floor | Ops on MO; operator = Employee |
| `QualityCheck` | Quality | QC on MO / product |
| `Employee` | Employees | Labor |
| `Attendance` | Attendances | Time for Employee |
| `SctDocument` | SCT Documentation | Prints / SOP / certs |

Only skills already allowlisted execute at runtime; others are catalogued for future epics.

## Related

- [Development/ontology](../../Development/ontology.md)  
- [Epic-07](../../Development/Epic-07/README.md)  
- [ConnectorsDocs](../ConnectorsDocs/README.md)  
- [TaxonomyDocs](../TaxonomyDocs/README.md)  
- [ContractsDocs](../ContractsDocs/README.md)  
