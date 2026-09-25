declare module '@control-panel-ontology/ontology' {
  export type OntologyActionSummary = {
    id: string;
    label: string;
    skill: string;
    description: string;
  };

  export type OntologyEntitySummary = {
    id: string;
    label: string;
    description: string;
    actions: OntologyActionSummary[];
  };

  export type OntologyEntityDetail = OntologyEntitySummary & {
    properties: unknown[];
    links: unknown[];
  };

  export function listEntityTypeIds(): string[];
  export function loadEntityType(id: string): Record<string, unknown>;
  export function listEntityTypesCatalog(): OntologyEntitySummary[];
  export function getEntityTypeCatalogDetail(id: string): OntologyEntityDetail;
  export function loadBinding(
    connectorId: string,
    entityType: string,
  ): Record<string, unknown>;
  export function validateOntology(): { entityTypes: string[] };
  export function loadConnectorsCatalog(): {
    connectors: Record<string, unknown>[];
  };
}
