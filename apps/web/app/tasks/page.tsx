import Link from 'next/link';
import { gatewayFetch } from '@/lib/api';

type Task = {
  id: string;
  intent_code: string;
  state: string;
  execution_mode: string;
  actor_id: string;
  correlation_id: string;
  created_at: string;
};

export default async function TasksPage() {
  let items: Task[] = [];
  let error: string | null = null;
  try {
    const { data } = await gatewayFetch('/tasks?limit=50');
    items = (data as { items: Task[] }).items ?? [];
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load tasks';
  }

  return (
    <>
      <h1>Task queue</h1>
      <p className="lede">
        Control-plane tasks stored in Postgres. Approve high-risk commit work
        from the detail view.
      </p>

      {error && <p className="error">{error}</p>}

      <div className="panel" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Intent</th>
              <th>State</th>
              <th>Mode</th>
              <th>Actor</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && !error && (
              <tr>
                <td colSpan={5}>No tasks yet. Create one from the console.</td>
              </tr>
            )}
            {items.map((t) => (
              <tr key={t.id}>
                <td>
                  <Link href={`/tasks/${t.id}`} className="mono">
                    {t.intent_code}
                  </Link>
                </td>
                <td>
                  <span className={`badge ${t.state}`}>{t.state}</span>
                </td>
                <td>{t.execution_mode}</td>
                <td className="mono">{t.actor_id}</td>
                <td>{new Date(t.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
