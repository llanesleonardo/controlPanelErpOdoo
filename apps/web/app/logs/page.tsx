import { Suspense } from 'react';
import { LogsExplorer } from './logs-explorer';

export default function LogsPage() {
  return (
    <Suspense fallback={<p className="lede">Loading logs…</p>}>
      <LogsExplorer />
    </Suspense>
  );
}
