'use client';

import { FormEvent, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { gatewayFetch } from '@/lib/api';

const DOMAINS = [
  'sales',
  'inventory',
  'purchasing',
  'accounting',
  'customers',
  'vendors',
  'products',
  'jobs',
  'incidents',
  'logs',
];

type ClassifyPreview = {
  intent_code: string | null;
  confidence: string;
  matched_by: string;
  candidates: string[];
  known: boolean;
  correlation_id?: string;
};

function ConsoleForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialIntent = searchParams.get('intent_code') || '';
  const initialDomain =
    searchParams.get('domain') ||
    initialIntent.split('.')[0] ||
    'inventory';

  const [domain, setDomain] = useState(initialDomain);
  const [text, setText] = useState(
    initialIntent ? initialIntent.replaceAll('.', ' ') : 'adjust stock',
  );
  const [intentCode, setIntentCode] = useState(initialIntent);
  const [mode, setMode] = useState<'dry_run' | 'commit'>('dry_run');
  const [preview, setPreview] = useState<ClassifyPreview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onClassify(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { data } = await gatewayFetch('/intents/classify', {
        method: 'POST',
        body: JSON.stringify({
          domain: domain || undefined,
          text: text || undefined,
          intent_code: intentCode || undefined,
        }),
      });
      setPreview(data as ClassifyPreview);
      if ((data as ClassifyPreview).intent_code) {
        setIntentCode((data as ClassifyPreview).intent_code ?? '');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Classify failed');
    } finally {
      setBusy(false);
    }
  }

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { data } = await gatewayFetch('/tasks', {
        method: 'POST',
        body: JSON.stringify({
          domain: domain || undefined,
          text: text || undefined,
          intent_code: intentCode || undefined,
          execution_mode: mode,
          input: { domain, text, source: 'console' },
        }),
      });
      const id = (data as { id: string }).id;
      router.push(`/tasks/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create task failed');
      setBusy(false);
    }
  }

  return (
    <>
      <h1>Request console</h1>
      <p className="lede">
        Map domain and text to a known intent, then create a control-plane task.
        High-risk commit intents require approval.
      </p>

      <form className="panel" onSubmit={onClassify}>
        <div className="row">
          <div>
            <label htmlFor="domain">Domain</label>
            <select
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            >
              {DOMAINS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="mode">Execution mode</label>
            <select
              id="mode"
              value={mode}
              onChange={(e) =>
                setMode(e.target.value as 'dry_run' | 'commit')
              }
            >
              <option value="dry_run">dry_run</option>
              <option value="commit">commit</option>
            </select>
          </div>
        </div>

        <label htmlFor="text">Text / hint</label>
        <textarea
          id="text"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. adjust stock for warehouse A"
        />

        <label htmlFor="intent">Intent code (optional override)</label>
        <input
          id="intent"
          className="mono"
          value={intentCode}
          onChange={(e) => setIntentCode(e.target.value)}
          placeholder="inventory.stock.adjust"
        />

        <div className="actions">
          <button type="submit" disabled={busy}>
            Classify preview
          </button>
          <button
            type="button"
            className="secondary"
            disabled={busy}
            onClick={onCreate}
          >
            Create task
          </button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {preview && (
        <div className="panel">
          <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>Classify result</h2>
          <p className="mono">
            {preview.intent_code ?? '(none)'} · {preview.confidence} ·{' '}
            {preview.matched_by}
            {preview.known ? ' · known' : ' · unknown'}
          </p>
          {preview.candidates?.length > 0 && (
            <p className="lede" style={{ marginBottom: 0 }}>
              Candidates: {preview.candidates.join(', ')}
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default function ConsolePage() {
  return (
    <Suspense fallback={<p className="lede">Loading console…</p>}>
      <ConsoleForm />
    </Suspense>
  );
}
