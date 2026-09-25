'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { gatewayFetch } from '@/lib/api';

type Config = {
  provider: string;
  url: string;
  db_name: string;
  username: string;
  secret_configured: boolean;
  mode: string;
  status: string;
  last_error: string | null;
  last_checked_at: string | null;
  source: { url: string; credentials: string };
};

type TestResult = {
  status: string;
  simulated: boolean;
  message?: string;
  error_class?: string;
};

export default function OdooIntegrationPage() {
  const [config, setConfig] = useState<Config | null>(null);
  const [url, setUrl] = useState('');
  const [dbName, setDbName] = useState('');
  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');
  const [test, setTest] = useState<TestResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    setError(null);
    try {
      const { data } = await gatewayFetch('/integrations/odoo');
      const c = data as Config;
      setConfig(c);
      setUrl(c.url ?? '');
      setDbName(c.db_name ?? '');
      setUsername(c.username ?? '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const body: Record<string, string> = {
        url,
        db_name: dbName,
        username,
      };
      if (secret.trim()) body.secret = secret.trim();
      const { data } = await gatewayFetch('/integrations/odoo', {
        method: 'PUT',
        body: JSON.stringify(body),
      });
      const c = data as Config;
      setConfig(c);
      setSecret('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  }

  async function onTest() {
    setBusy(true);
    setError(null);
    try {
      const { data } = await gatewayFetch('/integrations/odoo/test', {
        method: 'POST',
        body: '{}',
      });
      setTest(data as TestResult);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Test failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1>Ontology + AI · Odoo peer (SoA #1)</h1>
      <p className="lede">
        One connector in the hub catalog. Skills use domain ports; Odoo JSON-RPC
        stays behind an adapter.{' '}
        <Link href="/integrations">← All peer connectors</Link>. Mode:{' '}
        <span className="mono">{config?.mode ?? '…'}</span>
      </p>

      <form className="panel" onSubmit={onSave}>
        <label htmlFor="url">URL</label>
        <input
          id="url"
          className="mono"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="http://localhost:8069"
        />

        <div className="row">
          <div>
            <label htmlFor="db">Database</label>
            <input
              id="db"
              value={dbName}
              onChange={(e) => setDbName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="user">Username</label>
            <input
              id="user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <label htmlFor="secret">
          API key / password{' '}
          {config?.secret_configured ? '(configured — leave blank to keep)' : ''}
        </label>
        <input
          id="secret"
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          autoComplete="off"
        />

        {config && (
          <p className="lede" style={{ marginTop: 0 }}>
            Status{' '}
            <span className={`badge ${config.status}`}>{config.status}</span>
            {config.last_checked_at && (
              <> · checked {new Date(config.last_checked_at).toLocaleString()}</>
            )}
            {config.last_error && <> · {config.last_error}</>}
          </p>
        )}

        <div className="actions">
          <button type="submit" disabled={busy}>
            Save
          </button>
          <button
            type="button"
            className="secondary"
            disabled={busy}
            onClick={onTest}
          >
            Test connection
          </button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {test && (
        <div className="panel">
          <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>Test result</h2>
          <p className="mono">
            {test.status}
            {test.simulated ? ' · simulated' : ''}
            {test.error_class ? ` · ${test.error_class}` : ''}
          </p>
          {test.message && <p className="lede">{test.message}</p>}
        </div>
      )}
    </>
  );
}
