'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { gatewayFetch } from '@/lib/api';
import {
  OntologyFlowMap,
  type OntologyEntity,
} from '@/app/components/ontology-flow-map';
import { OntologyManager } from '@/app/components/ontology-manager';
import { OntologyObjectExplorer } from '@/app/components/ontology-object-explorer';
import { OntologyVertex } from '@/app/components/ontology-vertex';

type OntologyView = 'schema' | 'explorer' | 'vertex' | 'process';

export default function OntologyPage() {
  const [entities, setEntities] = useState<OntologyEntity[]>([]);
  const [selected, setSelected] = useState<OntologyEntity | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<OntologyView>('schema');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await gatewayFetch('/ontology');
        const list =
          (data as { entity_types?: OntologyEntity[] }).entity_types ?? [];
        if (!cancelled) {
          setEntities(list);
          setError(null);
          if (list.length === 1) {
            setSelected(list[0]);
          }
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load ontology');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const openEntity = useCallback(
    async (id: string) => {
      setError(null);
      const cached = entities.find((e) => e.id === id);
      if (cached?.properties) {
        setSelected(cached);
      }
      try {
        const { data } = await gatewayFetch(
          `/ontology/entity-types/${encodeURIComponent(id)}`,
        );
        setSelected(data as OntologyEntity);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load entity type');
      }
    },
    [entities],
  );

  return (
    <div>
      <h1>Ontology</h1>
      <p className="lede">
        Language browser: Schema Manager, Object Explorer, Vertex Search Around,
        and a curated process map. Actions run only as certified skills.{' '}
        <Link href="/">ERP Map</Link>
      </p>

      <details className="panel onto-edit-help">
        <summary>How to add, change, or remove entity types</summary>
        <ol>
          <li>
            Edit YAML under <code className="mono">packages/ontology/entity-types/</code>{' '}
            (add a file, change properties/links/actions, or delete a file).
          </li>
          <li>
            Map vendor fields in{' '}
            <code className="mono">packages/ontology/bindings/&lt;connector&gt;/</code>{' '}
            when a connector must read/write that object.
          </li>
          <li>
            Register any new action <code className="mono">skill:</code> codes in{' '}
            <code className="mono">packages/contracts</code> taxonomy, then{' '}
            <code className="mono">npm test -w @control-panel-erp/ontology</code>.
          </li>
          <li>
            Restart / reload the gateway so <code className="mono">GET /ontology</code>{' '}
            picks up files.
          </li>
        </ol>
        <p className="muted">
          v1 is <strong>product-owned Language</strong> (repo YAML). Visual gaps:{' '}
          <code className="mono">docs/GAPS/04</code>–
          <code className="mono">08</code>.
        </p>
      </details>

      {loading && <p className="muted">Loading catalog…</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="onto-view-tabs" role="tablist" aria-label="Ontology views">
            {(
              [
                ['schema', 'Schema'],
                ['explorer', 'Explorer'],
                ['vertex', 'Vertex'],
                ['process', 'Process map'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={view === id}
                className={view === id ? 'active' : undefined}
                onClick={() => setView(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {view === 'schema' && (
            <OntologyManager
              entities={entities}
              selected={selected}
              onSelect={openEntity}
            />
          )}

          {view === 'explorer' && (
            <OntologyObjectExplorer entities={entities} />
          )}

          {view === 'vertex' && <OntologyVertex entities={entities} />}

          {view === 'process' && (
            <>
              <OntologyFlowMap
                entities={entities}
                selectedId={selected?.id ?? null}
                onSelect={openEntity}
              />
              {selected && (
                <section className="panel ontology-detail ontology-layout-below">
                  <h2>{selected.label}</h2>
                  <p className="muted">{selected.description}</p>
                  <h3>Actions</h3>
                  <ul>
                    {(selected.actions ?? []).map((a) => (
                      <li key={a.id}>
                        <strong>{a.label}</strong>
                        <div className="muted">
                          skill <code className="mono">{a.skill}</code>
                          {a.description ? ` — ${a.description}` : ''}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {!selected && (
                <p className="muted ontology-layout-below">
                  Click a node to inspect actions in the panel.
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
