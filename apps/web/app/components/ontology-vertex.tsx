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
import type { OntologyEntity, OntologyLink } from './ontology-types';

type VertexNodeData = {
  label: string;
  entityId: string;
  selected: boolean;
  expanded: boolean;
};

type GraphTemplate = {
  id: string;
  name: string;
  seedId: string;
  nodeIds: string[];
  savedAt: string;
};

const STORAGE_KEY = 'cp-ontology-vertex-templates';

function loadTemplates(): GraphTemplate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as GraphTemplate[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistTemplates(items: GraphTemplate[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 20)));
}

function VertexNode({ data }: NodeProps) {
  const d = data as VertexNodeData;
  const kind = iconKind(d.entityId, d.label);
  return (
    <div
      className={`onto-iso-node${d.selected ? ' selected' : ''}${d.expanded ? ' onto-vx-expanded' : ''}`}
    >
      <Handle type="target" position={Position.Left} className="onto-iso-handle" />
      <div className="onto-iso-pad">
        <div className="onto-iso-ring">
          <EntityIcon kind={kind} />
        </div>
      </div>
      <div className="onto-iso-label">{d.label}</div>
      <Handle type="source" position={Position.Right} className="onto-iso-handle" />
    </div>
  );
}

function VertexEdge({
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
        style={{ stroke: '#18181b', strokeWidth: 2 }}
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

const nodeTypes = { vertex: VertexNode };
const edgeTypes = { vertex: VertexEdge };

function positionFor(index: number, total: number): { x: number; y: number } {
  if (total <= 1) return { x: 320, y: 220 };
  const cols = Math.min(4, Math.max(2, Math.ceil(Math.sqrt(total))));
  const col = index % cols;
  const row = Math.floor(index / cols);
  return { x: 80 + col * 240, y: 80 + row * 180 };
}

type Props = {
  entities: OntologyEntity[];
};

/**
 * Vertex-style exploration — Gap 06 first slice (type-level Search Around).
 * Seed a type, expand link neighborhood, save graph templates locally.
 * Instance Search Around waits on Gap 01 / Gap 05 Engine.
 * Pattern: Component-Based Architecture.
 */
export function OntologyVertex({ entities }: Props) {
  const byId = useMemo(() => new Map(entities.map((e) => [e.id, e])), [entities]);
  const defaultSeed =
    entities.find((e) => e.id === 'SalesOrder')?.id ??
    entities.find((e) => e.id === 'Estimate')?.id ??
    entities[0]?.id ??
    '';

  const [seedId, setSeedId] = useState(defaultSeed);
  const [visibleIds, setVisibleIds] = useState<string[]>(
    defaultSeed ? [defaultSeed] : [],
  );
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(defaultSeed || null);
  const [linkFilter, setLinkFilter] = useState('');
  const [templates, setTemplates] = useState<GraphTemplate[]>([]);
  const [templateName, setTemplateName] = useState('');

  useEffect(() => {
    setTemplates(loadTemplates());
  }, []);

  const resetToSeed = useCallback((id: string) => {
    setSeedId(id);
    setVisibleIds(id ? [id] : []);
    setExpandedIds(new Set());
    setSelectedId(id || null);
  }, []);

  const searchAround = useCallback(
    (fromId: string) => {
      const entity = byId.get(fromId);
      if (!entity) return;
      const filter = linkFilter.trim().toLowerCase();
      const links = (entity.links ?? []).filter((l: OntologyLink) => {
        if (!filter) return true;
        return (
          l.name.toLowerCase().includes(filter) ||
          l.target.toLowerCase().includes(filter)
        );
      });
      setVisibleIds((prev) => {
        const next = new Set(prev);
        for (const l of links) {
          if (byId.has(l.target)) next.add(l.target);
        }
        // Also reverse links (types that point at fromId)
        for (const e of entities) {
          for (const l of e.links ?? []) {
            if (l.target !== fromId) continue;
            if (
              filter &&
              !l.name.toLowerCase().includes(filter) &&
              !e.id.toLowerCase().includes(filter)
            ) {
              continue;
            }
            next.add(e.id);
          }
        }
        return [...next];
      });
      setExpandedIds((prev) => new Set(prev).add(fromId));
      setSelectedId(fromId);
    },
    [byId, entities, linkFilter],
  );

  const { nodes, edges } = useMemo(() => {
    const nodesOut: Node[] = visibleIds.map((id, i) => {
      const e = byId.get(id);
      return {
        id,
        type: 'vertex',
        position: positionFor(i, visibleIds.length),
        data: {
          label: e?.label ?? id,
          entityId: id,
          selected: id === selectedId,
          expanded: expandedIds.has(id),
        },
      };
    });

    const known = new Set(visibleIds);
    const edgesOut: Edge[] = [];
    for (const id of visibleIds) {
      const e = byId.get(id);
      for (const l of e?.links ?? []) {
        if (!known.has(l.target)) continue;
        edgesOut.push({
          id: `${id}-${l.name}-${l.target}`,
          source: id,
          target: l.target,
          type: 'vertex',
          label: l.name,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#18181b',
            width: 16,
            height: 16,
          },
        });
      }
    }
    return { nodes: nodesOut, edges: edgesOut };
  }, [visibleIds, byId, selectedId, expandedIds]);

  const selected = selectedId ? byId.get(selectedId) : null;

  function saveTemplate() {
    const name =
      templateName.trim() ||
      `From ${seedId} (${visibleIds.length} types)`.slice(0, 80);
    const next: GraphTemplate = {
      id: `tpl-${Date.now()}`,
      name,
      seedId,
      nodeIds: visibleIds,
      savedAt: new Date().toISOString(),
    };
    const items = [next, ...templates];
    setTemplates(items);
    persistTemplates(items);
    setTemplateName('');
  }

  function applyTemplate(t: GraphTemplate) {
    setSeedId(t.seedId);
    setVisibleIds(t.nodeIds.length ? t.nodeIds : [t.seedId]);
    setExpandedIds(new Set(t.nodeIds));
    setSelectedId(t.seedId);
  }

  function removeTemplate(id: string) {
    const items = templates.filter((t) => t.id !== id);
    setTemplates(items);
    persistTemplates(items);
  }

  return (
    <div className="onto-vx">
      <header className="onto-vx-toolbar panel">
        <div className="onto-ox-toolbar-copy">
          <h2 className="onto-mgr-title">Vertex</h2>
          <p className="muted onto-mgr-sub">
            Seed a type, then Search Around along schema links. Curated
            expansion — not every edge at once. Templates save in this browser.
          </p>
        </div>
        <div className="onto-vx-controls">
          <label>
            <span className="muted">Seed</span>
            <select
              value={seedId}
              onChange={(e) => resetToSeed(e.target.value)}
            >
              {entities.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="muted">Link filter</span>
            <input
              type="search"
              value={linkFilter}
              onChange={(e) => setLinkFilter(e.target.value)}
              placeholder="optional name/target…"
              autoComplete="off"
            />
          </label>
          <button
            type="button"
            disabled={!selectedId}
            onClick={() => selectedId && searchAround(selectedId)}
          >
            Search Around
          </button>
          <button type="button" onClick={() => resetToSeed(seedId)}>
            Reset
          </button>
        </div>
        <div className="onto-vx-template-row">
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Template name…"
            autoComplete="off"
          />
          <button type="button" onClick={saveTemplate}>
            Save graph template
          </button>
        </div>
      </header>

      {templates.length > 0 && (
        <section className="panel onto-ox-saved" aria-label="Graph templates">
          <h3>Saved templates</h3>
          <ul>
            {templates.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  className="linkish"
                  onClick={() => applyTemplate(t)}
                >
                  {t.name}
                </button>
                <span className="muted">
                  {' '}
                  · {t.nodeIds.length} types ·{' '}
                  {new Date(t.savedAt).toLocaleString()}
                </span>
                <button
                  type="button"
                  className="onto-ox-remove"
                  onClick={() => removeTemplate(t.id)}
                  aria-label={`Remove ${t.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="onto-vx-body">
        <div className="onto-flow-canvas onto-iso-canvas panel">
          <div className="onto-iso-grid" aria-hidden />
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodeClick={(_, node) => setSelectedId(node.id)}
            onNodeDoubleClick={(_, node) => searchAround(node.id)}
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

        <aside className="panel onto-mgr-inspector">
          {!selected && <p className="muted">Select a node.</p>}
          {selected && (
            <>
              <div className="onto-mgr-inspector-head">
                <span className="onto-mgr-inspector-icon">
                  <EntityIcon
                    kind={iconKind(selected.id, selected.label)}
                    size={52}
                  />
                </span>
                <div>
                  <h2>{selected.label}</h2>
                  <code className="mono muted">{selected.id}</code>
                  <p className="muted">{selected.description}</p>
                </div>
              </div>
              <p className="muted">
                Double-click node or use Search Around to expand neighbors.
                {expandedIds.has(selected.id) ? ' (expanded)' : ''}
              </p>
              <h3>Outbound links</h3>
              {(selected.links ?? []).length === 0 ? (
                <p className="muted">None</p>
              ) : (
                <ul className="onto-mgr-link-list">
                  {(selected.links ?? []).map((l) => (
                    <li key={l.name}>
                      <code className="mono">{l.name}</code>
                      <span className="muted"> → </span>
                      <button
                        type="button"
                        className="linkish"
                        onClick={() => {
                          setVisibleIds((prev) =>
                            prev.includes(l.target) ? prev : [...prev, l.target],
                          );
                          setSelectedId(l.target);
                        }}
                      >
                        {l.target}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                className="onto-vx-expand-btn"
                onClick={() => searchAround(selected.id)}
              >
                Search Around from {selected.label}
              </button>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
