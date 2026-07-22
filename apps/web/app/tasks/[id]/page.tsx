import Link from 'next/link';
import { notFound } from 'next/navigation';
import { gatewayFetch } from '@/lib/api';
import { TaskActions } from './task-actions';

type Task = {
  id: string;
  intent_code: string;
  state: string;
  execution_mode: string;
  actor_id: string;
  correlation_id: string;
  skill_id: string | null;
  input: unknown;
  output: unknown;
  error: unknown;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
};

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let task: Task | null = null;
  try {
    const { data } = await gatewayFetch(`/tasks/${id}`);
    task = data as Task;
  } catch {
    notFound();
  }

  if (!task) notFound();

  return (
    <>
      <p>
        <Link href="/tasks">← Tasks</Link>
      </p>
      <h1 className="mono" style={{ fontSize: '1.4rem' }}>
        {task.intent_code}
      </h1>
      <p className="lede">
        <span className={`badge ${task.state}`}>{task.state}</span>{' '}
        {task.execution_mode} · actor {task.actor_id}
      </p>

      <div className="panel">
        <p>
          <strong>Id</strong> <span className="mono">{task.id}</span>
        </p>
        <p>
          <strong>Correlation</strong>{' '}
          <Link
            className="mono"
            href={`/logs?correlation_id=${encodeURIComponent(task.correlation_id)}`}
          >
            {task.correlation_id}
          </Link>
        </p>
        {task.approved_by && (
          <p>
            <strong>Approved/rejected by</strong> {task.approved_by} at{' '}
            {task.approved_at
              ? new Date(task.approved_at).toLocaleString()
              : '—'}
          </p>
        )}
        <TaskActions id={task.id} state={task.state} />
      </div>

      <div className="panel">
        <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>Input</h2>
        <pre className="pre">{JSON.stringify(task.input, null, 2)}</pre>
      </div>

      {task.output != null && (
        <div className="panel">
          <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>Output</h2>
          <pre className="pre">{JSON.stringify(task.output, null, 2)}</pre>
        </div>
      )}

      {task.error != null && (
        <div className="panel">
          <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>Error</h2>
          <pre className="pre">{JSON.stringify(task.error, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
