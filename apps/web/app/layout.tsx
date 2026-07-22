import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Control Panel ERP',
  description: 'Ops surfaces for OpenClaw → Odoo control plane',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="shell-header">
          <Link href="/" className="brand">
            Control Panel ERP
          </Link>
          <nav>
            <Link href="/console">Console</Link>
            <Link href="/tasks">Tasks</Link>
            <Link href="/logs">Logs</Link>
            <Link href="/integrations/odoo">Integrations</Link>
          </nav>
        </header>
        <main className="shell-main">{children}</main>
      </body>
    </html>
  );
}
