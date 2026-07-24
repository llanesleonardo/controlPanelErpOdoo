import Link from 'next/link';
import {
  ERP_SECTIONS,
  sectionHref,
  type SectionStatus,
} from '@/lib/erp-sections';

function statusLabel(status: SectionStatus) {
  if (status === 'live') return 'live';
  if (status === 'dry_run') return 'dry-run';
  return 'planned';
}

function tileInitial(title: string) {
  return title.trim().charAt(0).toUpperCase();
}

export function ErpAppsGrid() {
  return (
    <section className="odoo-apps" aria-label="ERP modules">
      <div className="odoo-apps-grid">
        {ERP_SECTIONS.map((section) => (
          <Link
            key={section.slug}
            href={sectionHref(section.slug)}
            className="odoo-app-tile"
          >
            <span className="odoo-app-icon" aria-hidden="true">
              {tileInitial(section.title)}
            </span>
            <span className="odoo-app-label">{section.title}</span>
            <span
              className={`map-badge map-badge-${section.status} odoo-app-badge`}
            >
              {statusLabel(section.status)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
