'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { EntityIcon, iconKind } from './ontology-icons';
import type { OntologyEntity } from './ontology-types';

type Props = {
  entities: OntologyEntity[];
  selected: OntologyEntity | null;
  onSelect: (id: string) => void;
};

/**
 * Ontology Manager (schema) — catalog of types, links, actions, icons.
 * Read-only v1; authoring stays in product-owned YAML (Gap 03 / Gap 04).
 * Pattern: Component-Based Architecture (catalog + inspector).
 */
export function OntologyManager({ entities, selected, onSelect }: Props) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entities;
    return entities.filter((e) => {
      const hay = [
        e.id,
        e.label,
        e.description,
        ...(e.actions ?? []).map((a) => `${a.label} ${a.skill}`),
        ...(e.links ?? []).map((l) => `${l.name} ${l.target}`),
        ...(e.properties ?? []).map((p) => p.name),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [entities, query]);

  const counts = useMemo(() => {
    let props = 0;
    let links = 0;
    let actions = 0;
    for (const e of entities) {
      props += e.properties?.length ?? 0;
      links += e.links?.length ?? 0;
      actions += e.actions?.length ?? 0;
    }
    return { types: entities.length, props, links, actions };
  }, [entities]);

  return (
    <div className="onto-mgr">
      <header className="onto-mgr-toolbar panel">
        <div className="onto-mgr-toolbar-copy">
          <h2 className="onto-mgr-title">Ontology Manager</h2>
          <p className="muted onto-mgr-sub">
            Schema catalog — types, properties, links, and actions. Not a process
            flowchart; editing stays in product-owned YAML.
          </p>
        </div>
        <label className="onto-mgr-search">
          <span className="sr-only">Search entity types</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search types, properties, links, skills…"
            autoComplete="off"
          />
        </label>
        <dl className="onto-mgr-stats">
          <div>
            <dt>Types</dt>
            <dd>{counts.types}</dd>
          </div>
          <div>
            <dt>Properties</dt>
            <dd>{counts.props}</dd>
          </div>
          <div>
            <dt>Links</dt>
            <dd>{counts.links}</dd>
          </div>
          <div>
            <dt>Actions</dt>
            <dd>{counts.actions}</dd>
          </div>
        </dl>
      </header>

      <div className="onto-mgr-body">
        <section className="panel onto-mgr-catalog" aria-label="Entity type catalog">
          <table className="onto-mgr-table">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Props</th>
                <th scope="col">Links</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="muted">
                    No types match “{query}”.
                  </td>
                </tr>
              )}
              {filtered.map((e) => {
                const kind = iconKind(e.id, e.label);
                const active = selected?.id === e.id;
                return (
                  <tr key={e.id} className={active ? 'active' : undefined}>
                    <td>
                      <button
                        type="button"
                        className="onto-mgr-row-btn"
                        onClick={() => onSelect(e.id)}
                      >
                        <span className="onto-mgr-row-icon">
                          <EntityIcon kind={kind} size={36} />
                        </span>
                        <span className="onto-mgr-row-text">
                          <strong>{e.label}</strong>
                          <code className="mono muted">{e.id}</code>
                        </span>
                      </button>
                    </td>
                    <td>{e.properties?.length ?? 0}</td>
                    <td>{e.links?.length ?? 0}</td>
                    <td>{e.actions?.length ?? 0}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="panel onto-mgr-inspector" aria-label="Type inspector">
          {!selected && (
            <p className="muted">Select a type to inspect schema.</p>
          )}
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

              <h3>Properties</h3>
              {(selected.properties ?? []).length === 0 ? (
                <p className="muted">None</p>
              ) : (
                <table className="onto-mgr-detail-table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selected.properties ?? []).map((p) => (
                      <tr key={p.name}>
                        <td>
                          <code className="mono">{p.name}</code>
                        </td>
                        <td className="muted">{p.type}</td>
                        <td className="muted">{p.description ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <h3>Links</h3>
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
                        onClick={() => onSelect(l.target)}
                      >
                        {l.target}
                      </button>
                      {l.cardinality ? (
                        <span className="muted"> ({l.cardinality})</span>
                      ) : null}
                      {l.description ? (
                        <div className="muted">{l.description}</div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}

              <h3>Actions</h3>
              {(selected.actions ?? []).length === 0 ? (
                <p className="muted">None</p>
              ) : (
                <ul className="onto-mgr-action-list">
                  {(selected.actions ?? []).map((a) => (
                    <li key={a.id}>
                      <strong>{a.label}</strong>
                      <div className="muted">
                        skill <code className="mono">{a.skill}</code>
                        {a.description ? ` — ${a.description}` : ''}
                      </div>
                      {a.skill.includes('estimate') && (
                        <div>
                          <Link
                            href={`/sections/sales?intent=${encodeURIComponent(a.skill)}`}
                          >
                            Open in Sales section
                          </Link>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
