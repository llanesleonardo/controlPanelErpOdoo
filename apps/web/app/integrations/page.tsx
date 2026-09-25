'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { gatewayFetch } from '@/lib/api';
import { CONNECTOR_CATALOG, kindLabel } from '../../lib/connector-catalog';

type CatalogHealth = {
  status: string;
  mode?: string;
  simulated: boolean;
  message?: string | null;
};

type CatalogRow = (typeof CONNECTOR_CATALOG)[number] & {
  health?: CatalogHealth;
  supported_skills?: string[];
};

function statusBadge(c: CatalogRow) {
  if (c.status === 'production_wedge') {
    return { className: 'map-badge map-badge-live', label: 'Live wedge' };
  }
  return { className: 'map-badge map-badge-planned', label: 'Architecture stub' };
}

function healthBadge(health?: CatalogHealth) {
  if (!health) return null;
  if (health.status === 'stub_simulate') {
    return (
      <span className="map-badge map-badge-dry_run" style={{ marginLeft: '0.35rem' }}>
        simulate · stub
      </span>
    );
  }
  const label = health.simulated
    ? `health · simulate`
    : `health · ${health.status}`;
  return (
    <span className="map-badge map-badge-dry_run" style={{ marginLeft: '0.35rem' }}>
      {label}
    </span>
  );
}

export default function IntegrationsHubPage() {
  const [connectors, setConnectors] = useState<CatalogRow[]>(CONNECTOR_CATALOG);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await gatewayFetch('/integrations/catalog');
        const list = (data as { connectors?: CatalogRow[] }).connectors;
        if (!cancelled && list?.length) {
          setConnectors(list);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : 'Could not load live catalog',
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <h1>Ontology + AI · peer edges</h1>
      <p className="lede">
        <strong>Ontology</strong> is the center; peers (ERP, MES, data, logic)
        attach through a product-owned catalog — ERP, MES, data, and logic, not
        a single-vendor addon. <strong>AI</strong> and operators use the same
        allowlisted skills to each <strong>owning</strong> peer. Odoo is the
        first live SoA on the reference shop; the map covers the full shop.
      </p>

      {error ? (
        <p className="muted" role="status">
          Showing cached catalog ({error}).
        </p>
      ) : null}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {connectors.map((c) => {
          const badge = statusBadge(c);
          return (
            <li key={c.connector_id} className="panel">
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem' }}>
                {c.label}{' '}
                <span className={badge.className}>{badge.label}</span>
                {healthBadge(c.health)}
              </h2>
              <p className="mono muted" style={{ margin: '0 0 0.5rem' }}>
                {c.connector_id}
              </p>
              <p style={{ margin: '0 0 0.5rem' }}>
                <span className="muted">{kindLabel(c.kind)}</span>
                {' · '}
                Modes: {c.modes.join(', ')}
              </p>
              <p style={{ margin: '0 0 0.5rem' }}>{c.notes}</p>
              {c.health?.message ? (
                <p className="muted" style={{ margin: '0 0 0.75rem', fontSize: '0.9rem' }}>
                  {c.health.message}
                </p>
              ) : null}
              {c.connector_id === 'odoo' ? (
                <Link href="/integrations/odoo">Configure Odoo peer →</Link>
              ) : null}
            </li>
          );
        })}
      </ul>

      <p className="muted" style={{ fontSize: '0.85rem' }}>
        Live catalog: <code className="mono">GET /integrations/catalog</code>{' '}
        · source{' '}
        <code className="mono">catalog/connectors.yaml</code>. Stubs show{' '}
        <strong>simulate · stub</strong> until OPS closes live peers.
      </p>
    </>
  );
}
