'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  MarkerType,
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { EntityIcon, iconKind } from './ontology-icons';
import type { OntologyAction, OntologyEntity } from './ontology-types';

export type { OntologyAction, OntologyEntity, OntologyLink } from './ontology-types';

type EntityNodeData = {
  label: string;
  description: string;
  entityId: string;
  actions: OntologyAction[];
  propertyCount: number;
  selected: boolean;
  ghost?: boolean;
};

function EntityNode({ data }: NodeProps) {
  const d = data as EntityNodeData;
  const kind = iconKind(d.entityId, d.label);

  return (
    <div
      className={`onto-iso-node${d.selected ? ' selected' : ''}${d.ghost ? ' ghost' : ''}`}
    >
      <Handle type="target" position={Position.Left} className="onto-iso-handle" />
      <div className="onto-iso-pad">
        <div className="onto-iso-ring">
          <EntityIcon kind={kind} />
        </div>
      </div>
      <div className="onto-iso-label">{d.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        className="onto-iso-handle"
      />
    </div>
  );
}

function OntologyEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: '#18181b',
          strokeWidth: 2,
        }}
      />
      {label ? (
        <EdgeLabelRenderer>
          <div
            className="onto-iso-edge-label"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
          >
            <span className="onto-iso-edge-rel">{String(label)}</span>
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
}

const nodeTypes = { entity: EntityNode };
const edgeTypes = { ontology: OntologyEdge };

/** Business-process layout (tool manufacturing) — canvas only; actions stay in the detail panel. */
const PROCESS_POSITIONS: Record<string, { x: number; y: number }> = {
  // Commercial spine
  Contact: { x: 40, y: 200 },
  Estimate: { x: 260, y: 200 },
  Quote: { x: 480, y: 200 },
  SalesOrder: { x: 700, y: 200 },
  InventoryItem: { x: 920, y: 200 },
  ManufacturingOrder: { x: 1140, y: 200 },
  ShopFloorJob: { x: 1360, y: 200 }, // shipping / floor
  // Buy / receive branch under sales
  PurchaseOrder: { x: 700, y: 420 },
  // Quality + docs after manufacturing
  QualityCheck: { x: 1140, y: 40 },
  SctDocument: { x: 1360, y: 40 },
  // Labor lane
  Employee: { x: 1360, y: 420 },
  Attendance: { x: 1140, y: 420 },
};

/** Primary process edges shown on canvas (not every YAML link — avoids spaghetti). */
const PROCESS_EDGES: { source: string; target: string; label: string }[] = [
  { source: 'Contact', target: 'Estimate', label: 'request' },
  { source: 'Estimate', target: 'Quote', label: 'to quote' },
  { source: 'Quote', target: 'SalesOrder', label: 'confirm' },
  { source: 'SalesOrder', target: 'InventoryItem', label: 'allocate' },
  { source: 'InventoryItem', target: 'ManufacturingOrder', label: 'produce' },
  { source: 'ManufacturingOrder', target: 'ShopFloorJob', label: 'ship / floor' },
  { source: 'SalesOrder', target: 'PurchaseOrder', label: 'buy' },
  { source: 'PurchaseOrder', target: 'InventoryItem', label: 'receive' },
  { source: 'ManufacturingOrder', target: 'QualityCheck', label: 'inspect' },
  { source: 'QualityCheck', target: 'SctDocument', label: 'document' },
  { source: 'Employee', target: 'ShopFloorJob', label: 'operate' },
  { source: 'Employee', target: 'Attendance', label: 'time' },
  { source: 'Employee', target: 'QualityCheck', label: 'inspect' },
];

function layoutEntities(entities: OntologyEntity[]): {
  nodes: Node[];
  edges: Edge[];
} {
  const byId = new Map(entities.map((e) => [e.id, e]));
  const known = new Set(entities.map((e) => e.id));

  const nodes: Node[] = entities.map((e, i) => {
    const pos =
      PROCESS_POSITIONS[e.id] ?? {
        x: 40 + (i % 3) * 220,
        y: 560 + Math.floor(i / 3) * 160,
      };
    return {
      id: e.id,
      type: 'entity',
      position: pos,
      data: {
        label: e.label,
        description: e.description,
        entityId: e.id,
        actions: e.actions ?? [],
        propertyCount: e.properties?.length ?? 0,
        selected: false,
      },
    };
  });

  const edges: Edge[] = PROCESS_EDGES.filter(
    (e) => known.has(e.source) && known.has(e.target),
  ).map((e) => ({
    id: `process-${e.source}-${e.target}-${e.label}`,
    source: e.source,
    target: e.target,
    type: 'ontology',
    label: e.label,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#18181b',
      width: 16,
      height: 16,
    },
  }));

  // Ensure we did not drop entities that only appear as link targets in YAML
  void byId;

  return { nodes, edges };
}

type Props = {
  entities: OntologyEntity[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function OntologyFlowMap({ entities, selectedId, onSelect }: Props) {
  const { nodes: baseNodes, edges } = useMemo(
    () => layoutEntities(entities),
    [entities],
  );

  const [nodes, setNodes] = useState<Node[]>(baseNodes);

  useEffect(() => {
    setNodes(
      baseNodes.map((n) => ({
        ...n,
        data: {
          ...n.data,
          selected: n.id === selectedId,
        },
      })),
    );
  }, [baseNodes, selectedId]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      onSelect(node.id);
    },
    [onSelect],
  );

  const brokenLinks = useMemo(() => {
    const known = new Set(entities.map((e) => e.id));
    const issues: string[] = [];
    for (const e of entities) {
      for (const link of e.links ?? []) {
        if (!known.has(link.target)) {
          issues.push(`${e.id}.${link.name} → ${link.target} (missing entity)`);
        }
      }
    }
    return issues;
  }, [entities]);

  return (
    <div className="onto-flow-wrap">
      <div className="onto-flow-canvas onto-iso-canvas panel">
        <div className="onto-iso-grid" aria-hidden />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={onNodeClick}
          fitView
          minZoom={0.35}
          maxZoom={1.4}
          proOptions={{ hideAttribution: true }}
          className="onto-iso-flow"
          colorMode="light"
        >
          <Background
            variant={BackgroundVariant.Lines}
            gap={28}
            size={1}
            color="rgba(24,24,27,0.12)"
          />
          <Controls />
          <MiniMap
            pannable
            zoomable
            bgColor="#fafafa"
            nodeColor={() => '#18181b'}
            maskColor="rgba(24,24,27,0.12)"
          />
        </ReactFlow>
      </div>
      {brokenLinks.length > 0 && (
        <div className="panel onto-flow-issues">
          <h3>Connection checks</h3>
          <ul>
            {brokenLinks.map((msg) => (
              <li key={msg} className="error">
                {msg}
              </li>
            ))}
          </ul>
        </div>
      )}
      {brokenLinks.length === 0 && entities.length > 0 && (
        <p className="muted onto-flow-ok">
          Process view: Contact → Estimate → Quote → Sales → Inventory →
          Manufacturing → Shop floor; branch Sales → PO → Inventory (receive).
          Actions remain in the detail panel below.
        </p>
      )}
    </div>
  );
}
