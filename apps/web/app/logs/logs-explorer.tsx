'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { gatewayFetch } from '@/lib/api';

type LogEntry = {
  timestamp: string;
  level: string;
  service: string;
  message: string;
  correlation_id?: string;
  actor_id?: string;
  context?: string;
};

export function LogsExplorer() {
  const searchParams = useSearchParams();
  const initial = searchParams.get('correlation_id') ?? '';
  const [correlationId, setCorrelationId] = useState(initial);
  const [items, setItems] = useState<LogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load(cid?: string) {
    setBusy(true);
    setError(null);
    try {
      const q = cid
        ? `?correlation_id=${encodeURIComponent(cid)}&limit=100`
        : '?limit=100';
      const { data } = await gatewayFetch(`/logs${q}`);
      setItems((data as { items: LogEntry[] }).items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load logs');
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    void load(initial || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void load(correlationId.trim() || undefined);
  }

  return (
    <>
      <h1>Log explorer</h1>
      <p className="lede">
        Structured JSON logs from the gateway. Filter by correlation id to
        follow a request across console and queue actions.
      </p>

      <form className="panel" onSubmit={onSubmit}>
        <label htmlFor="cid">Correlation id</label>
        <input
          id="cid"
          className="mono"
          value={correlationId}
          onChange={(e) => setCorrelationId(e.target.value)}
          placeholder="optional"
        />
        <div className="actions">
          <button type="submit" disabled={busy}>
            Search
          </button>
          <button
            type="button"
            className="secondary"
            disabled={busy}
            onClick={() => {
              setCorrelationId('');
              void load();
            }}
          >
            Recent
          </button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="panel">
        {items.length === 0 && !error && (
          <p className="lede" style={{ margin: 0 }}>
            No log entries yet.
          </p>
        )}
        {items.map((e, i) => (
          <div
            key={`${e.timestamp}-${i}`}
            style={{
              borderBottom: '1px solid var(--border)',
              padding: '0.65rem 0',
            }}
          >
            <div
              className="mono"
              style={{ color: 'var(--muted)', fontSize: '0.75rem' }}
            >
              {e.timestamp} · {e.level} · {e.service}
              {e.context ? ` · ${e.context}` : ''}
            </div>
            <div>{e.message}</div>
            {(e.correlation_id || e.actor_id) && (
              <div
                className="mono"
                style={{ fontSize: '0.8rem', marginTop: 4 }}
              >
                {e.correlation_id && <>cid={e.correlation_id} </>}
                {e.actor_id && <>actor={e.actor_id}</>}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
