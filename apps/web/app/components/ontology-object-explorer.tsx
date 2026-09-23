'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { gatewayFetch } from '@/lib/api';
import { EntityIcon, iconKind } from './ontology-icons';
import type { OntologyEntity } from './ontology-types';

type Column = { key: string; label: string };

type ObjectsResponse = {
  entity_type: string;
  source: 'live' | 'demo';
  skill?: string | null;
  ok?: boolean;
  message?: string;
  mode?: string;
  columns?: Column[];
  objects?: Record<string, unknown>[];
  total_hint?: number;
  layout?: {
    id: string;
    label: string;
    kind: string;
    property_keys: string[];
    link_keys: string[];
  };
  warnings?: string[];
};

type SavedExploration = {
  id: string;
  name: string;
  entityType: string;
  query: string;
  savedAt: string;
};

const STORAGE_KEY = 'cp-ontology-explorations';

function loadSaved(): SavedExploration[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedExploration[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistSaved(items: SavedExploration[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 20)));
}

type Props = {
  entities: OntologyEntity[];
};

/**
 * Object Explorer — Gap 05 first slice.
 * Search/filter objects for a type; Estimate uses live skill; others demo.
 * Saved explorations are local-only until Gap 01 Engine.
 * Pattern: Component-Based Architecture + BFF `/ontology/objects`.
 */
export function OntologyObjectExplorer({ entities }: Props) {
  const defaultType = entities.find((e) => e.id === 'Estimate')?.id ?? entities[0]?.id ?? '';
  const [entityType, setEntityType] = useState(defaultType);
  const [queryInput, setQueryInput] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<ObjectsResponse | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saved, setSaved] = useState<SavedExploration[]>([]);

  const catalog = useMemo(
    () => entities.find((e) => e.id === entityType) ?? null,
    [entities, entityType],
  );

  useEffect(() => {
    setSaved(loadSaved());
  }, []);

  const load = useCallback(async () => {
    if (!entityType) return;
    setBusy(true);
    setError(null);
    try {
      const qs = new URLSearchParams({
        entity_type: entityType,
        limit: '50',
      });
      if (appliedQuery) qs.set('q', appliedQuery);
      const { data } = await gatewayFetch(`/ontology/objects?${qs.toString()}`);
      const body = data as ObjectsResponse;
      setPayload(body);
      const first = body.objects?.[0];
      setSelectedId(
        first ? String(first.__object_id ?? first.id ?? null) : null,
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load objects');
      setPayload(null);
      setSelectedId(null);
    } finally {
      setBusy(false);
    }
  }, [entityType, appliedQuery]);

  useEffect(() => {
    void load();
  }, [load]);

  const selected = useMemo(() => {
    if (!payload?.objects || !selectedId) return null;
    return (
      payload.objects.find(
        (o) => String(o.__object_id ?? o.id) === selectedId,
      ) ?? null
    );
  }, [payload, selectedId]);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    setAppliedQuery(queryInput.trim());
  }

  function saveExploration() {
    const name = `${entityType}${appliedQuery ? ` · ${appliedQuery}` : ''}`.slice(
      0,
      80,
    );
    const next: SavedExploration = {
      id: `exp-${Date.now()}`,
      name,
      entityType,
      query: appliedQuery,
      savedAt: new Date().toISOString(),
    };
    const items = [next, ...saved.filter((s) => s.name !== name)];
    setSaved(items);
    persistSaved(items);
  }

  function applySaved(item: SavedExploration) {
    setEntityType(item.entityType);
    setQueryInput(item.query);
    setAppliedQuery(item.query);
  }

  function removeSaved(id: string) {
    const items = saved.filter((s) => s.id !== id);
    setSaved(items);
    persistSaved(items);
  }

  const columns = payload?.columns ?? [];
  const objects = payload?.objects ?? [];

  return (
    <div className="onto-ox">
      <header className="onto-ox-toolbar panel">
        <div className="onto-ox-toolbar-copy">
          <h2 className="onto-mgr-title">Object Explorer</h2>
          <p className="muted onto-mgr-sub">
            Search objects by type. Estimate uses live{' '}
            <code className="mono">sales.estimate.read</code>; other types use
            demo rows until more skills are allowlisted (Gap 01 Engine still
            deferred).
          </p>
        </div>
        <div className="onto-ox-controls">
          <label>
            <span className="muted">Type</span>
            <select
              value={entityType}
              onChange={(e) => {
                setEntityType(e.target.value);
                setQueryInput('');
                setAppliedQuery('');
              }}
            >
              {entities.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.label}
                </option>
              ))}
            </select>
          </label>
          <form className="onto-ox-search" onSubmit={onSearch}>
            <input
              type="search"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Filter / contains…"
              autoComplete="off"
            />
            <button type="submit" disabled={busy}>
              Search
            </button>
          </form>
          <button type="button" className="onto-ox-save" onClick={saveExploration}>
            Save exploration
          </button>
        </div>
        {payload && (
          <p className="onto-ox-meta muted">
            source <strong>{payload.source}</strong>
            {payload.skill ? (
              <>
                {' '}
                · skill <code className="mono">{payload.skill}</code>
              </>
            ) : null}
            {payload.mode ? <> · mode {payload.mode}</> : null}
            {typeof payload.total_hint === 'number'
              ? ` · ${payload.total_hint} rows`
              : null}
            {payload.message ? ` — ${payload.message}` : null}
          </p>
        )}
      </header>

      {saved.length > 0 && (
        <section className="panel onto-ox-saved" aria-label="Saved explorations">
          <h3>Saved explorations</h3>
          <ul>
            {saved.map((s) => (
              <li key={s.id}>
                <button type="button" className="linkish" onClick={() => applySaved(s)}>
                  {s.name}
                </button>
                <span className="muted">
                  {' '}
                  · {new Date(s.savedAt).toLocaleString()}
                </span>
                <button
                  type="button"
                  className="onto-ox-remove"
                  onClick={() => removeSaved(s.id)}
                  aria-label={`Remove ${s.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {busy && <p className="muted">Loading objects…</p>}
      {error && <p className="error">{error}</p>}

      {!busy && !error && (
        <div className="onto-ox-body">
          <section className="panel onto-ox-list" aria-label="Object list">
            <table className="onto-mgr-table">
              <thead>
                <tr>
                  {columns.slice(0, 6).map((c) => (
                    <th key={c.key} scope="col">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {objects.length === 0 && (
                  <tr>
                    <td colSpan={Math.max(columns.length, 1)} className="muted">
                      No objects.
                    </td>
                  </tr>
                )}
                {objects.map((row) => {
                  const oid = String(row.__object_id ?? row.id);
                  return (
                    <tr
                      key={oid}
                      className={selectedId === oid ? 'active' : undefined}
                      onClick={() => setSelectedId(oid)}
                    >
                      {columns.slice(0, 6).map((c) => (
                        <td key={c.key}>{formatCell(row[c.key])}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <section className="panel onto-mgr-inspector" aria-label="Object layout">
            {!selected && <p className="muted">Select an object.</p>}
            {selected && catalog && (
              <>
                <div className="onto-mgr-inspector-head">
                  <span className="onto-mgr-inspector-icon">
                    <EntityIcon
                      kind={iconKind(catalog.id, catalog.label)}
                      size={52}
                    />
                  </span>
                  <div>
                    <h2>
                      {catalog.label}{' '}
                      <span className="muted mono">
                        #{String(selected.__object_id ?? selected.id)}
                      </span>
                    </h2>
                    <p className="muted">
                      Layout: {payload?.layout?.label ?? 'properties'}
                    </p>
                  </div>
                </div>

                <h3>Properties</h3>
                <table className="onto-mgr-detail-table">
                  <tbody>
                    {Object.entries(selected)
                      .filter(([k]) => !k.startsWith('__'))
                      .map(([k, v]) => (
                        <tr key={k}>
                          <td>
                            <code className="mono">{k}</code>
                          </td>
                          <td>{formatCell(v)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <h3>Linked types</h3>
                {(catalog.links ?? []).length === 0 ? (
                  <p className="muted">None on schema</p>
                ) : (
                  <ul className="onto-mgr-link-list">
                    {(catalog.links ?? []).map((l) => (
                      <li key={l.name}>
                        <code className="mono">{l.name}</code>
                        <span className="muted"> → {l.target}</span>
                        <div className="muted">
                          Instance links need Gap 01 Engine; schema target only.
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <h3>Actions</h3>
                <ul className="onto-mgr-action-list">
                  {(catalog.actions ?? []).map((a) => (
                    <li key={a.id}>
                      <strong>{a.label}</strong>
                      <div className="muted">
                        skill <code className="mono">{a.skill}</code>
                      </div>
                      {a.skill.includes('estimate') && (
                        <Link
                          href={`/sections/sales?intent=${encodeURIComponent(a.skill)}`}
                        >
                          Open in Sales
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

function formatCell(v: unknown): string {
  if (v == null) return '—';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}
