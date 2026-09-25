import type { ReactNode } from 'react';
import { AppShell } from './components/app-shell';
import './globals.css';

export const metadata = {
  title: 'Ontology + AI · Control Panel',
  description:
    'Foundry-shaped Ontology + AI — full manufacturing map, multi-peer edges, governed skills',
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
