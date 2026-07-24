'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { getErpSection } from '@/lib/erp-sections';
import {
  classifyIntentProfile,
  difficultyLabel,
  getSectionIntents,
  type IntentStatus,
} from '@/lib/section-intents';

function statusLabel(status: IntentStatus) {
  if (status === 'known') return 'known';
  if (status === 'dry_run') return 'dry-run';
  return 'planned';
}

function badgeClass(status: IntentStatus) {
  if (status === 'known') return 'live';
  if (status === 'dry_run') return 'dry_run';
  return 'planned';
}

export function parseSectionSlug(pathname: string): string | null {
  const match = pathname.match(/^\/sections\/([^/]+)/);
  return match?.[1] ?? null;
}

type Props = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export function IntentRail({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const slug = parseSectionSlug(pathname);
  const activeIntent = searchParams.get('intent') ?? '';
  const [query, setQuery] = useState('');

  useEffect(() => {
    onCloseMobile();
  }, [pathname, activeIntent, onCloseMobile]);

  useEffect(() => {
    setQuery('');
  }, [slug]);

  const intents = useMemo(
    () => (slug ? getSectionIntents(slug) : []),
    [slug],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return intents;
    return intents.filter((intent) => {
      const profile = classifyIntentProfile(intent);
      return (
        intent.label.toLowerCase().includes(q) ||
        intent.code.toLowerCase().includes(q) ||
        intent.status.toLowerCase().includes(q) ||
        profile.difficulty.includes(q) ||
        difficultyLabel(profile.difficulty).toLowerCase().includes(q)
      );
    });
  }, [intents, query]);

  if (!slug) return null;

  const section = getErpSection(slug);
  const title = section?.title ?? slug;

  return (
    <>
      <button
        type="button"
        className="intent-rail-backdrop"
        aria-label="Close intents"
        tabIndex={mobileOpen ? 0 : -1}
        onClick={onCloseMobile}
      />

      <aside
        className={[
          'intent-rail',
          collapsed ? 'collapsed' : '',
          mobileOpen ? 'mobile-open' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label="List of intents"
        id="intent-rail"
      >
        <div className="intent-rail-top">
          <div className="intent-rail-heading">
            <span className="intent-rail-kicker">Intents</span>
            <strong className="intent-rail-section">{title}</strong>
          </div>
          <button
            type="button"
            className="nav-icon-btn intent-rail-collapse-btn"
            aria-label={collapsed ? 'Expand intents' : 'Collapse intents'}
            aria-pressed={collapsed}
            onClick={onToggleCollapse}
          >
            {collapsed ? '»' : '«'}
          </button>
          <button
            type="button"
            className="nav-icon-btn intent-rail-close-btn"
            aria-label="Close intents"
            onClick={onCloseMobile}
          >
            ×
          </button>
        </div>

        <div className="intent-rail-search">
          <label className="sr-only" htmlFor="intent-search">
            Search intents
          </label>
          <input
            id="intent-search"
            type="search"
            className="intent-rail-search-input"
            placeholder="Search intents…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>

        <nav className="intent-rail-nav">
          {intents.length === 0 ? (
            <p className="intent-rail-empty">
              No intents mapped for this section.
            </p>
          ) : filtered.length === 0 ? (
            <p className="intent-rail-empty">No intents match “{query.trim()}”.</p>
          ) : (
            filtered.map((intent) => {
              const href = `/sections/${slug}?intent=${encodeURIComponent(intent.code)}`;
              const active = activeIntent === intent.code;
              return (
                <Link
                  key={intent.code}
                  href={href}
                  className={
                    active ? 'intent-rail-link active' : 'intent-rail-link'
                  }
                  aria-current={active ? 'page' : undefined}
                  title={intent.code}
                  onClick={onCloseMobile}
                >
                  <span className="intent-rail-link-label">{intent.label}</span>
                  <span className="intent-rail-link-code">{intent.code}</span>
                  <span className="intent-rail-badges">
                    <span
                      className={`map-badge map-badge-${badgeClass(intent.status)} intent-rail-badge`}
                    >
                      {statusLabel(intent.status)}
                    </span>
                    <span className="intent-rail-difficulty">
                      {difficultyLabel(classifyIntentProfile(intent).difficulty)}
                    </span>
                  </span>
                </Link>
              );
            })
          )}
        </nav>
      </aside>
    </>
  );
}
