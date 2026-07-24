import type { ReactNode } from 'react';
import { AppShell } from './components/app-shell';
import './globals.css';

export const metadata = {
  title: 'Control Panel ERP',
  description: 'Ops surfaces for OpenClaw → Odoo control plane',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('cp-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
