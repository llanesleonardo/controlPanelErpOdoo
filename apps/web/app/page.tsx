import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <h1>Ops surfaces</h1>
      <p className="lede">
        Control-plane console for classifying intents, queuing tasks, and
        inspecting correlation-linked logs. Dev actor stub until auth lands.
      </p>
      <div className="home-links">
        <Link href="/console">
          Request console
          <span>Classify intents and create dry-run or commit tasks</span>
        </Link>
        <Link href="/tasks">
          Task queue
          <span>List, inspect, approve, or reject tasks</span>
        </Link>
        <Link href="/logs">
          Log explorer
          <span>Browse structured JSON logs by correlation id</span>
        </Link>
        <Link href="/integrations/odoo">
          ERP connector
          <span>Configure and health-check the Odoo adapter</span>
        </Link>
      </div>
    </>
  );
}
