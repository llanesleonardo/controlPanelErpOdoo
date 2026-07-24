'use client';

import { ReactNode, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IntentRail, parseSectionSlug } from './intent-rail';

const ERP_ODOO_NAV = [
  { href: '/', label: 'ERP Map', match: (p: string) => p === '/' },
  {
    href: '/console',
    label: 'Console',
    match: (p: string) => p.startsWith('/console'),
  },
  {
    href: '/tasks',
    label: 'Tasks',
    match: (p: string) => p.startsWith('/tasks'),
  },
  {
    href: '/logs',
    label: 'Logs',
    match: (p: string) => p.startsWith('/logs'),
  },
  {
    href: '/integrations/odoo',
    label: 'Integrations',
    match: (p: string) => p.startsWith('/integrations'),
  },
] as const;

type Theme = 'dark' | 'light';

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('cp-theme', theme);
  } catch {
    // ignore
  }
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [intentCollapsed, setIntentCollapsed] = useState(false);
  const [intentMobileOpen, setIntentMobileOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  const sectionSlug = useMemo(() => parseSectionSlug(pathname), [pathname]);
  const hasIntentRail = Boolean(sectionSlug);

  const erpSectionActive = useMemo(
    () =>
      ERP_ODOO_NAV.some((item) => item.match(pathname)) ||
      pathname.startsWith('/sections'),
    [pathname],
  );

  const [erpOpen, setErpOpen] = useState(true);

  const closeIntentMobile = useCallback(() => {
    setIntentMobileOpen(false);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setIntentMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (erpSectionActive) setErpOpen(true);
  }, [erpSectionActive]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setIntentMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    let initial: Theme = 'dark';
    try {
      const saved = localStorage.getItem('cp-theme');
      if (saved === 'light' || saved === 'dark') initial = saved;
    } catch {
      // ignore
    }
    setTheme(initial);
    applyTheme(initial);
  }, []);

  function setThemeMode(next: Theme) {
    setTheme(next);
    applyTheme(next);
  }

  return (
    <div
      className={[
        'app-shell',
        mobileOpen ? 'nav-open' : '',
        collapsed ? 'nav-collapsed' : '',
        hasIntentRail ? 'has-intent-rail' : '',
        intentCollapsed ? 'intent-rail-collapsed' : '',
        intentMobileOpen ? 'intent-rail-mobile-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        className="sidebar-backdrop"
        aria-label="Close menu"
        tabIndex={mobileOpen ? 0 : -1}
        onClick={() => setMobileOpen(false)}
      />

      <aside className="sidebar" id="main-sidebar" aria-label="Main menu">
        <div className="sidebar-top">
          <Link
            href="/"
            className="brand sidebar-brand"
            onClick={() => setMobileOpen(false)}
          >
            <span className="brand-full">Control Panel ERP</span>
            <span className="brand-short" aria-hidden>
              CP
            </span>
          </Link>
          <button
            type="button"
            className="nav-icon-btn sidebar-collapse-btn"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-pressed={collapsed}
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed ? '»' : '«'}
          </button>
          <button
            type="button"
            className="nav-icon-btn sidebar-close-btn"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            ×
          </button>
        </div>

        <p className="sidebar-menu-label">Main menu</p>

        <div className="theme-toggle" role="group" aria-label="Color theme">
          <button
            type="button"
            aria-pressed={theme === 'dark'}
            onClick={() => setThemeMode('dark')}
          >
            Dark
          </button>
          <button
            type="button"
            aria-pressed={theme === 'light'}
            onClick={() => setThemeMode('light')}
          >
            Light
          </button>
        </div>

        <nav className="sidebar-nav">
          <div
            className={`nav-accordion${erpOpen ? ' open' : ''}${erpSectionActive ? ' section-active' : ''}`}
          >
            <button
              type="button"
              className="nav-accordion-trigger"
              aria-expanded={erpOpen}
              aria-controls="nav-erp-odoo"
              id="nav-erp-odoo-trigger"
              title="ERP Odoo"
              onClick={() => {
                if (collapsed) {
                  setCollapsed(false);
                  setErpOpen(true);
                  return;
                }
                setErpOpen((v) => !v);
              }}
            >
              <span className="nav-label">ERP Odoo</span>
              <span className="nav-accordion-chevron" aria-hidden>
                {erpOpen ? '▾' : '▸'}
              </span>
            </button>
            <div
              id="nav-erp-odoo"
              className="nav-accordion-panel"
              role="region"
              aria-labelledby="nav-erp-odoo-trigger"
              hidden={!erpOpen}
            >
              {ERP_ODOO_NAV.map((item) => {
                const active = item.match(pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      active
                        ? 'nav-link nav-link-child active'
                        : 'nav-link nav-link-child'
                    }
                    aria-current={active ? 'page' : undefined}
                    title={item.label}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="nav-label">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <p className="sidebar-foot">Dev actor stub</p>
      </aside>

      {hasIntentRail && (
        <Suspense fallback={null}>
          <IntentRail
            collapsed={intentCollapsed}
            onToggleCollapse={() => setIntentCollapsed((v) => !v)}
            mobileOpen={intentMobileOpen}
            onCloseMobile={closeIntentMobile}
          />
        </Suspense>
      )}

      <div className="shell-body">
        <header className="topbar">
          <button
            type="button"
            className="nav-icon-btn menu-toggle"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="main-sidebar"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
          {hasIntentRail && (
            <button
              type="button"
              className="nav-icon-btn intent-toggle"
              aria-label="Open intents"
              aria-expanded={intentMobileOpen}
              aria-controls="intent-rail"
              onClick={() => setIntentMobileOpen(true)}
            >
              Intents
            </button>
          )}
          <Link href="/" className="brand topbar-brand">
            Control Panel ERP
          </Link>
        </header>
        <main className="shell-main">{children}</main>
      </div>
    </div>
  );
}
