/** Shared ontology catalog types (Language / schema). */

export type OntologyAction = {
  id: string;
  label: string;
  skill: string;
  description: string;
};

export type OntologyLink = {
  name: string;
  target: string;
  cardinality?: string;
  description?: string;
};

export type OntologyEntity = {
  id: string;
  label: string;
  description: string;
  actions: OntologyAction[];
  properties?: { name: string; type: string; description?: string }[];
  links?: OntologyLink[];
};
