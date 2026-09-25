/**
 * Mirror of resources/packages/ontology/catalog/connectors.yaml for demo UI.
 * Keep in sync when catalog changes.
 */
export type ConnectorKind =
  | 'system_of_action'
  | 'data_source'
  | 'logic_source';

export type ConnectorStatus =
  | 'production_wedge'
  | 'architecture_stub';

export type ConnectorCatalogEntry = {
  connector_id: string;
  kind: ConnectorKind;
  label: string;
  status: ConnectorStatus;
  modes: ('live' | 'simulate')[];
  notes: string;
};

export const CONNECTOR_CATALOG: ConnectorCatalogEntry[] = [
  {
    connector_id: 'odoo',
    kind: 'system_of_action',
    label: 'Odoo ERP',
    status: 'production_wedge',
    modes: ['live', 'simulate'],
    notes: 'SoA peer #1 — Estimate read wedge.',
  },
  {
    connector_id: 'mes_peer_simulate',
    kind: 'system_of_action',
    label: 'MES (simulate stub)',
    status: 'architecture_stub',
    modes: ['simulate'],
    notes: 'Catalog pattern before live MES (GAP-09).',
  },
  {
    connector_id: 'file_reference_data',
    kind: 'data_source',
    label: 'File / reference data (stub)',
    status: 'architecture_stub',
    modes: ['simulate'],
    notes: 'Data-edge bindings without public raw payload (GAP-10).',
  },
  {
    connector_id: 'rules_logic_simulate',
    kind: 'logic_source',
    label: 'Rules / logic service (stub)',
    status: 'architecture_stub',
    modes: ['simulate'],
    notes: 'Action → skill → logic connector (GAP-11).',
  },
];

export function kindLabel(kind: ConnectorKind): string {
  switch (kind) {
    case 'system_of_action':
      return 'System of action';
    case 'data_source':
      return 'Data source';
    case 'logic_source':
      return 'Logic source';
    default:
      return kind;
  }
}
