'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { gatewayFetch } from '@/lib/api';

export function TaskActions({ id, state }: { id: string; state: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (state !== 'needs_approval') return null;

  async function act(action: 'approve' | 'reject') {
    setBusy(true);
    setError(null);
    try {
      await gatewayFetch(`/tasks/${id}/${action}`, { method: 'POST' });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="actions">
      <button type="button" disabled={busy} onClick={() => act('approve')}>
        Approve
      </button>
      <button
        type="button"
        className="danger"
        disabled={busy}
        onClick={() => act('reject')}
      >
        Reject
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
