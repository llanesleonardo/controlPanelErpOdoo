'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { gatewayFetch } from '@/lib/api';

type Column = { key: string; label: string };

type ExecutePayload = {
  ok?: boolean;
  mode?: string;
  warnings?: string[];
  columns?: Column[];
  rows?: Record<string, unknown>[];
  total_hint?: number;
  message?: string;
  adapter?: { model?: string; method?: string; mode?: string };
};

type Props = {
  intentCode: string;
  fallbackColumns: Column[];
  fallbackRows: Record<string, string | number>[];
  /** Read-only contains search (estimate read). */
  enableContainsSearch?: boolean;
};

export function IntentLiveOutput({
  intentCode,
  fallbackColumns,
  fallbackRows,
  enableContainsSearch = false,
}: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ExecutePayload | null>(null);
  const [containsInput, setContainsInput] = useState('');
  const [appliedContains, setAppliedContains] = useState('');

  const load = useCallback(
    async (contains: string) => {
      setBusy(true);
      setError(null);
      try {
        const input: Record<string, unknown> = {
          limit: 50,
          active_only: true,
        };
        const needle = contains.trim();
        if (enableContainsSearch && needle) {
          input.contains = needle;
        }
        const { data: body } = await gatewayFetch('/skills/execute', {
          method: 'POST',
          body: JSON.stringify({
            intent_code: intentCode,
            input,
          }),
        });
        setData(body as ExecutePayload);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load live data',
        );
        setData(null);
      } finally {
        setBusy(false);
      }
    },
    [intentCode, enableContainsSearch],
  );

  useEffect(() => {
    void load(appliedContains);
  }, [load, appliedContains]);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    setAppliedContains(containsInput.trim());
  }

  function onClear() {
    setContainsInput('');
    setAppliedContains('');
  }

  const columns = data?.columns?.length ? data.columns : fallbackColumns;
  const rows = data?.rows?.length ? data.rows : data ? [] : fallbackRows;
  const mode = data?.mode ?? 'pending';

  return (
    <section className="panel intent-block">
      <div className="intent-block-head">
        <h2 className="intent-block-title">Output data</h2>
        <div className="intent-output-meta">
          <span className="muted">
            {mode === 'live'
              ? `Live · ${data?.total_hint ?? rows.length} rows`
              : mode === 'simulate'
                ? 'Simulate'
                : busy
                  ? 'Loading…'
                  : '—'}
          </span>
          <button
            type="button"
            className="secondary"
            disabled={busy}
            onClick={() => void load(appliedContains)}
          >
            Refresh
          </button>
        </div>
      </div>

      {enableContainsSearch && (
        <form className="intent-contains-search" onSubmit={onSearch}>
          <label htmlFor="estimate-contains">Estimate contains</label>
          <div className="intent-contains-row">
            <input
              id="estimate-contains"
              type="search"
              value={containsInput}
              onChange={(e) => setContainsInput(e.target.value)}
              placeholder="Part no or description…"
              autoComplete="off"
            />
            <button type="submit" disabled={busy}>
              Search
            </button>
            <button
              type="button"
              className="secondary"
              disabled={busy || (!containsInput && !appliedContains)}
              onClick={onClear}
            >
              Clear
            </button>
          </div>
          <p className="muted intent-contains-hint">
            Rule: contains (case-insensitive) on part no or description.
            {appliedContains ? ` Active filter: “${appliedContains}”.` : ''}
          </p>
        </form>
      )}

      {error && <p className="error">{error}</p>}
      {data?.warnings?.map((w) => (
        <p key={w} className="muted">
          {w}
        </p>
      ))}

      <div className="intent-table-wrap">
        <table className="intent-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} scope="col">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {busy && rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>Loading from Odoo…</td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  {appliedContains
                    ? `No estimates contain “${appliedContains}”.`
                    : 'No estimates returned.'}
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={`${String(row.id ?? idx)}-${idx}`}>
                  {columns.map((col) => (
                    <td key={col.key}>{formatCell(row[col.key])}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'yes' : 'no';
  return String(value);
}
