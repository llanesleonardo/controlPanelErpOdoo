export type SectionStatus = 'live' | 'dry_run' | 'planned';

export type ErpSection = {
  slug: string;
  title: string;
  status: SectionStatus;
  branch: string;
  summary: string;
};

export const ERP_SECTIONS: ErpSection[] = [
  {
    slug: 'quotes',
    title: 'Quotes',
    status: 'planned',
    branch: 'Sales & CRM',
    summary: 'Create and manage customer quotes.',
  },
  {
    slug: 'estimates',
    title: 'Estimates',
    status: 'planned',
    branch: 'Sales & CRM',
    summary: 'Prepare estimates before firm quotes or orders.',
  },
  {
    slug: 'sales',
    title: 'Sales',
    status: 'planned',
    branch: 'Sales & CRM',
    summary: 'Sales orders and commercial pipeline.',
  },
  {
    slug: 'crm',
    title: 'CRM',
    status: 'planned',
    branch: 'Sales & CRM',
    summary: 'Leads, opportunities, and customer relationship work.',
  },
  {
    slug: 'contacts',
    title: 'Contacts',
    status: 'planned',
    branch: 'Sales & CRM',
    summary: 'People and company contact records.',
  },
  {
    slug: 'accounting',
    title: 'Accounting',
    status: 'dry_run',
    branch: 'Finance',
    summary: 'Ledger, invoices, and accounting dry-run skills.',
  },
  {
    slug: 'inventory',
    title: 'Inventory',
    status: 'dry_run',
    branch: 'Supply chain',
    summary: 'Stock levels and inventory dry-run skills.',
  },
  {
    slug: 'purchase',
    title: 'Purchase',
    status: 'planned',
    branch: 'Supply chain',
    summary: 'Purchase orders and vendor buying.',
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing',
    status: 'planned',
    branch: 'Supply chain',
    summary: 'Bills of materials and manufacturing orders.',
  },
  {
    slug: 'shop-floor',
    title: 'Shop Floor',
    status: 'planned',
    branch: 'Supply chain',
    summary: 'Shop floor execution and work center activity.',
  },
  {
    slug: 'quality',
    title: 'Quality',
    status: 'planned',
    branch: 'Supply chain',
    summary: 'Quality checks and control points.',
  },
  {
    slug: 'barcode',
    title: 'Barcode',
    status: 'planned',
    branch: 'Supply chain',
    summary: 'Barcode scanning for warehouse and shop operations.',
  },
  {
    slug: 'website',
    title: 'Website',
    status: 'planned',
    branch: 'Marketing',
    summary: 'Public website and content publishing.',
  },
  {
    slug: 'marketing-automation',
    title: 'Marketing Automation',
    status: 'planned',
    branch: 'Marketing',
    summary: 'Automated campaigns and nurture flows.',
  },
  {
    slug: 'email-marketing',
    title: 'Email Marketing',
    status: 'planned',
    branch: 'Marketing',
    summary: 'Email campaigns and mailing lists.',
  },
  {
    slug: 'employees',
    title: 'Employees',
    status: 'planned',
    branch: 'People & fleet',
    summary: 'Employee directory and HR profiles.',
  },
  {
    slug: 'attendances',
    title: 'Attendances',
    status: 'planned',
    branch: 'People & fleet',
    summary: 'Time and attendance tracking.',
  },
  {
    slug: 'fleet',
    title: 'Fleet',
    status: 'planned',
    branch: 'People & fleet',
    summary: 'Vehicles and fleet operations.',
  },
  {
    slug: 'discuss',
    title: 'Discuss',
    status: 'planned',
    branch: 'Collaboration',
    summary: 'Internal messaging and channels.',
  },
  {
    slug: 'calendar',
    title: 'Calendar',
    status: 'planned',
    branch: 'Collaboration',
    summary: 'Meetings and shared calendars.',
  },
  {
    slug: 'dashboards',
    title: 'Dashboards',
    status: 'planned',
    branch: 'Collaboration',
    summary: 'Operational and management dashboards.',
  },
  {
    slug: 'apps',
    title: 'Apps',
    status: 'planned',
    branch: 'Platform',
    summary: 'Installed ERP apps and modules.',
  },
  {
    slug: 'sct-documentation',
    title: 'SCT Documentation',
    status: 'planned',
    branch: 'Platform',
    summary: 'SCT process and product documentation.',
  },
  {
    slug: 'settings',
    title: 'Settings',
    status: 'planned',
    branch: 'Platform',
    summary: 'Control-plane and ERP section settings.',
  },
];

export function getErpSection(slug: string): ErpSection | undefined {
  return ERP_SECTIONS.find((s) => s.slug === slug);
}

export function sectionHref(slug: string): string {
  return `/sections/${slug}`;
}
