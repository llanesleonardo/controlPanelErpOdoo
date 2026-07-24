import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ERP_SECTIONS,
  getErpSection,
  type SectionStatus,
} from '@/lib/erp-sections';
import {
  consoleHrefForIntent,
  difficultyLabel,
  getSectionIntent,
  getSectionIntents,
  resolveIntentDetail,
} from '@/lib/section-intents';
import { IntentLiveOutput } from '@/app/components/intent-live-output';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ intent?: string }>;
};

export function generateStaticParams() {
  return ERP_SECTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const section = getErpSection(slug);
  if (!section) return { title: 'Section · Control Panel ERP' };
  return {
    title: `${section.title} · Control Panel ERP`,
    description: section.summary,
  };
}

function statusLabel(status: SectionStatus) {
  if (status === 'live') return 'live';
  if (status === 'dry_run') return 'dry-run';
  return 'planned';
}

export default async function ErpSectionPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { intent: intentCode } = await searchParams;
  const section = getErpSection(slug);
  if (!section) notFound();

  const intents = getSectionIntents(slug);
  const selectedRaw = intentCode
    ? getSectionIntent(slug, intentCode)
    : undefined;
  const selected = selectedRaw
    ? resolveIntentDetail(selectedRaw)
    : undefined;

  return (
    <>
      <p className="breadcrumb">
        <Link href="/">ERP Map</Link>
        <span aria-hidden="true"> / </span>
        <span>{section.branch}</span>
        <span aria-hidden="true"> / </span>
        <span>{section.title}</span>
        {selected && (
          <>
            <span aria-hidden="true"> / </span>
            <span>{selected.label}</span>
          </>
        )}
      </p>

      {!selected ? (
        <>
          <h1>{section.title}</h1>
          <p className="lede">{section.summary}</p>
          <div className="panel section-blank">
            <div className="section-blank-meta">
              <span className={`map-badge map-badge-${section.status}`}>
                {statusLabel(section.status)}
              </span>
              <span className="muted">
                {intents.length} intent{intents.length === 1 ? '' : 's'} mapped
              </span>
            </div>
            <p className="section-blank-note">
              Pick an intent from the list to see its objective, description,
              and sample output table.
            </p>
          </div>
        </>
      ) : (
        <div className="intent-detail-page">
          <div className="intent-detail-header">
            <div>
              <h1>{selected.label}</h1>
              <code className="intent-code">{selected.code}</code>
            </div>
            <div className="intent-detail-actions">
              {(selected.status === 'known' ||
                selected.status === 'dry_run') && (
                <Link
                  className="btn"
                  href={consoleHrefForIntent(selected.code)}
                >
                  Open in console
                </Link>
              )}
              <Link href={`/sections/${slug}`} className="btn secondary">
                Back to section
              </Link>
            </div>
          </div>

          <div
            className="intent-call-path"
            aria-label="Intent to Odoo call path"
          >
            {selected.callPath.map((step, index) => (
              <div key={`${step.label}-${index}`} className="intent-call-path-item">
                {index > 0 && (
                  <span className="intent-call-path-arrow" aria-hidden>
                    →
                  </span>
                )}
                <div className="intent-call-path-node">
                  <span className="intent-call-path-label">{step.label}</span>
                  {step.detail && (
                    <span className="intent-call-path-detail">{step.detail}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <section className="panel intent-block">
            <h2 className="intent-block-title">Execution profile</h2>
            <div className="intent-profile">
              <span
                className={`intent-profile-badge intent-profile-${selected.profile.difficulty}`}
              >
                {difficultyLabel(selected.profile.difficulty)}
              </span>
              <span className="intent-profile-meta">
                input · {selected.profile.input_mode.replaceAll('_', ' ')}
              </span>
              <span className="intent-profile-meta">
                steps · {selected.profile.steps}
              </span>
            </div>
            <p className="intent-block-body muted intent-profile-reason">
              {selected.profile.reason}
            </p>
          </section>

          <section className="panel intent-block">
            <h2 className="intent-block-title">Objective</h2>
            <p className="intent-block-body">{selected.objective}</p>
          </section>

          <section className="panel intent-block">
            <h2 className="intent-block-title">Description</h2>
            <p className="intent-block-body">{selected.description}</p>
          </section>

          {selected.code === 'sales.estimate.read' ? (
            <IntentLiveOutput
              intentCode={selected.code}
              fallbackColumns={selected.outputColumns}
              fallbackRows={selected.outputRows}
              enableContainsSearch
            />
          ) : (
            <section className="panel intent-block">
              <div className="intent-block-head">
                <h2 className="intent-block-title">Output data</h2>
                <span className="muted">Dummy rows · simulate</span>
              </div>
              <div className="intent-table-wrap">
                <table className="intent-table">
                  <thead>
                    <tr>
                      {selected.outputColumns.map((col) => (
                        <th key={col.key} scope="col">
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selected.outputRows.map((row, idx) => (
                      <tr key={`${String(row.id)}-${idx}`}>
                        {selected.outputColumns.map((col) => (
                          <td key={col.key}>{row[col.key] ?? '—'}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
}
