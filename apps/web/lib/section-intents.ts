export type IntentStatus = 'known' | 'dry_run' | 'planned';

/**
 * Deterministic difficulty classes for future skill routing.
 * Classifiers must stay rule-based (code / explicit profile) — not ML.
 *
 * - simple: single fetch / read — return data and stop
 * - structured: create/update/cancel with typed fields
 * - diagnostic: analyze records and surface issues (multi-read + rules)
 * - nl_compose: natural-language content → structured draft → ERP write
 */
export type IntentDifficulty =
  | 'simple'
  | 'structured'
  | 'diagnostic'
  | 'nl_compose';

export type IntentInputMode =
  | 'none'
  | 'structured'
  | 'natural_language'
  | 'mixed';

export type IntentStepShape = 'single' | 'multi';

export type IntentExecutionProfile = {
  difficulty: IntentDifficulty;
  input_mode: IntentInputMode;
  steps: IntentStepShape;
  /** Human-readable rule that produced this profile (audit / UI) */
  reason: string;
};

export type IntentOutputColumn = {
  key: string;
  label: string;
};

export type IntentOutputRow = Record<string, string | number>;

export type IntentCallStep = {
  /** Short node label shown in the diagram */
  label: string;
  /** Secondary line (HTTP path, model.method, etc.) */
  detail?: string;
};

export type SectionIntent = {
  code: string;
  label: string;
  status: IntentStatus;
  summary: string;
  /** Short operator goal for this intent */
  objective?: string;
  /** Longer explanation of what the skill does against Odoo */
  description?: string;
  /** Column defs for sample / dry-run output table */
  outputColumns?: IntentOutputColumn[];
  /** Dummy rows until live ERP results are wired */
  outputRows?: IntentOutputRow[];
  /** Override call-path diagram nodes (intent → app → adapter → odoo) */
  callPath?: IntentCallStep[];
  /**
   * Explicit execution profile. Prefer setting this for diagnostic / NL
   * intents; otherwise `classifyIntentProfile` derives it from the code.
   */
  profile?: Partial<IntentExecutionProfile> & {
    difficulty: IntentDifficulty;
  };
};


/** Odoo-mapped intents per ERP section — browseable so operators do not guess codes. */
export const SECTION_INTENTS: Record<string, SectionIntent[]> = {
  quotes: [
    {
      code: 'sales.quotation.create',
      label: 'Create quotation',
      status: 'planned',
      summary: 'Create a customer quotation in Odoo.',
    },
    {
      code: 'sales.quotation.read',
      label: 'Read quotation',
      status: 'planned',
      summary: 'Fetch quotation details.',
    },
    {
      code: 'sales.quotation.update',
      label: 'Update quotation',
      status: 'planned',
      summary: 'Update lines, prices, or terms on a quotation.',
    },
    {
      code: 'sales.quotation.approve',
      label: 'Approve quotation',
      status: 'planned',
      summary: 'Approve / confirm a quotation.',
    },
    {
      code: 'sales.quotation.cancel',
      label: 'Cancel quotation',
      status: 'planned',
      summary: 'Cancel an open quotation.',
    },
  ],
  estimates: [
    {
      code: 'sales.estimate.create',
      label: 'Create estimate',
      status: 'planned',
      summary: 'Create a preliminary estimate before a firm quote.',
      profile: { difficulty: 'structured' },
    },
    {
      code: 'sales.estimate.create_from_text',
      label: 'Create estimate from content',
      status: 'planned',
      summary:
        'Draft an estimate from natural-language content (email, notes, scope).',
      objective:
        'Turn free-text scope into a structured estimate draft, then map lines to Odoo.',
      description:
        'Deterministic NL path: extract line items with allowlisted parsers / templates, require operator review, then call estimate create. No free-form model writes.',
      profile: {
        difficulty: 'nl_compose',
        input_mode: 'natural_language',
        steps: 'multi',
        reason: 'Explicit NL compose intent — grounded extract then structured write',
      },
    },
    {
      code: 'sales.estimate.read',
      label: 'Read estimate',
      status: 'known',
      summary: 'Fetch estimate details from customer.estimate (live).',
      objective:
        'List active SCT estimates from Odoo so operators can browse real part / pricing data.',
      description:
        'Live read skill: JSON-RPC authenticate then customer.estimate.search_read. Domain language stays estimate.*; Odoo model stays behind the adapter ACL.',
      profile: { difficulty: 'simple' },
      callPath: [
        { label: 'sales.estimate.read', detail: 'intent' },
        { label: 'POST /skills/execute', detail: 'app endpoint' },
        { label: 'customer.estimate.search_read', detail: 'adapter method' },
        { label: 'POST /jsonrpc', detail: 'odoo endpoint' },
      ],
    },
    {
      code: 'sales.estimate.find_issues',
      label: 'Find estimate issues',
      status: 'planned',
      summary:
        'Scan an estimate for pricing, margin, or completeness issues.',
      objective:
        'Surface deterministic issues on an estimate so operators can fix them before convert.',
      description:
        'Diagnostic skill: read estimate + related products, apply rule checks (missing tax, zero qty, margin floor), return an issue list. No ERP write.',
      profile: {
        difficulty: 'diagnostic',
        input_mode: 'structured',
        steps: 'multi',
        reason: 'Explicit diagnostic intent — multi-read + rule engine, no write',
      },
    },
    {
      code: 'sales.estimate.update',
      label: 'Update estimate',
      status: 'planned',
      summary: 'Revise estimate amounts or scope.',
      profile: { difficulty: 'structured' },
    },
    {
      code: 'sales.estimate.convert',
      label: 'Convert to quotation',
      status: 'planned',
      summary: 'Promote an estimate into a quotation.',
      profile: { difficulty: 'structured' },
    },
  ],
  sales: [
    {
      code: 'sales.order.create',
      label: 'Create sales order',
      status: 'known',
      summary: 'Create a sales order (known taxonomy sample).',
    },
    {
      code: 'sales.order.read',
      label: 'Read sales order',
      status: 'planned',
      summary: 'Fetch sales order details.',
    },
    {
      code: 'sales.order.update',
      label: 'Update sales order',
      status: 'planned',
      summary: 'Update an open sales order.',
    },
    {
      code: 'sales.order.approve',
      label: 'Confirm sales order',
      status: 'planned',
      summary: 'Confirm / approve a sales order.',
    },
    {
      code: 'sales.order.cancel',
      label: 'Cancel sales order',
      status: 'planned',
      summary: 'Cancel a sales order.',
    },
  ],
  crm: [
    {
      code: 'sales.lead.create',
      label: 'Create lead',
      status: 'planned',
      summary: 'Create a CRM lead.',
    },
    {
      code: 'sales.lead.update',
      label: 'Update lead',
      status: 'planned',
      summary: 'Update lead stage or fields.',
    },
    {
      code: 'sales.opportunity.create',
      label: 'Create opportunity',
      status: 'planned',
      summary: 'Create a CRM opportunity.',
    },
    {
      code: 'sales.opportunity.update',
      label: 'Update opportunity',
      status: 'planned',
      summary: 'Move or update an opportunity.',
    },
  ],
  contacts: [
    {
      code: 'customers.partner.update',
      label: 'Update partner',
      status: 'known',
      summary: 'Update customer/partner master data.',
    },
    {
      code: 'customers.partner.create',
      label: 'Create partner',
      status: 'planned',
      summary: 'Create a contact or company partner.',
    },
    {
      code: 'customers.partner.read',
      label: 'Read partner',
      status: 'planned',
      summary: 'Fetch partner details.',
    },
  ],
  accounting: [
    {
      code: 'accounting.invoice.post',
      label: 'Post invoice',
      status: 'dry_run',
      summary: 'Post a customer invoice (dry-run skill available).',
    },
    {
      code: 'accounting.invoice.create',
      label: 'Create invoice',
      status: 'planned',
      summary: 'Create a draft invoice.',
    },
    {
      code: 'accounting.invoice.read',
      label: 'Read invoice',
      status: 'planned',
      summary: 'Fetch invoice details.',
    },
    {
      code: 'accounting.payment.reconcile',
      label: 'Reconcile payment',
      status: 'planned',
      summary: 'Reconcile a payment against open items.',
    },
    {
      code: 'accounting.journal_entry.create',
      label: 'Create journal entry',
      status: 'planned',
      summary: 'Create a manual journal entry.',
    },
  ],
  inventory: [
    {
      code: 'inventory.stock.adjust',
      label: 'Adjust stock',
      status: 'dry_run',
      summary: 'Adjust stock quant (dry-run skill available).',
    },
    {
      code: 'inventory.stock_move.create',
      label: 'Create stock move',
      status: 'planned',
      summary: 'Create an internal or external stock move.',
    },
    {
      code: 'inventory.stock_quant.read',
      label: 'Read stock quant',
      status: 'planned',
      summary: 'Read on-hand quantity for a product/location.',
    },
    {
      code: 'inventory.warehouse.read',
      label: 'Read warehouse',
      status: 'planned',
      summary: 'Fetch warehouse configuration.',
    },
  ],
  purchase: [
    {
      code: 'purchasing.purchase_order.create',
      label: 'Create purchase order',
      status: 'planned',
      summary: 'Create a vendor purchase order.',
    },
    {
      code: 'purchasing.purchase_order.approve',
      label: 'Approve purchase order',
      status: 'planned',
      summary: 'Approve / confirm a PO.',
    },
    {
      code: 'purchasing.purchase_order.read',
      label: 'Read purchase order',
      status: 'planned',
      summary: 'Fetch purchase order details.',
    },
    {
      code: 'purchasing.purchase_order.cancel',
      label: 'Cancel purchase order',
      status: 'planned',
      summary: 'Cancel an open purchase order.',
    },
  ],
  manufacturing: [
    {
      code: 'inventory.manufacturing_order.create',
      label: 'Create MO',
      status: 'planned',
      summary: 'Create a manufacturing order.',
    },
    {
      code: 'inventory.manufacturing_order.approve',
      label: 'Confirm MO',
      status: 'planned',
      summary: 'Confirm a manufacturing order.',
    },
    {
      code: 'inventory.bom.read',
      label: 'Read BoM',
      status: 'planned',
      summary: 'Fetch bill of materials.',
    },
  ],
  'shop-floor': [
    {
      code: 'inventory.workorder.start',
      label: 'Start work order',
      status: 'planned',
      summary: 'Start a shop-floor work order.',
    },
    {
      code: 'inventory.workorder.close',
      label: 'Close work order',
      status: 'planned',
      summary: 'Complete / close a work order.',
    },
    {
      code: 'inventory.workcenter.read',
      label: 'Read work center',
      status: 'planned',
      summary: 'Fetch work center status.',
    },
  ],
  quality: [
    {
      code: 'inventory.quality_check.create',
      label: 'Create quality check',
      status: 'planned',
      summary: 'Open a quality check.',
    },
    {
      code: 'inventory.quality_check.approve',
      label: 'Pass quality check',
      status: 'planned',
      summary: 'Mark a quality check as passed.',
    },
    {
      code: 'inventory.quality_alert.create',
      label: 'Create quality alert',
      status: 'planned',
      summary: 'Raise a quality alert.',
    },
  ],
  barcode: [
    {
      code: 'inventory.barcode.scan',
      label: 'Scan barcode',
      status: 'planned',
      summary: 'Resolve a barcode to a product or location.',
    },
    {
      code: 'inventory.barcode.pick',
      label: 'Barcode pick',
      status: 'planned',
      summary: 'Record a pick via barcode.',
    },
    {
      code: 'inventory.barcode.putaway',
      label: 'Barcode putaway',
      status: 'planned',
      summary: 'Record putaway via barcode.',
    },
  ],
  website: [
    {
      code: 'sales.website_page.publish',
      label: 'Publish page',
      status: 'planned',
      summary: 'Publish a website page.',
    },
    {
      code: 'sales.website_page.update',
      label: 'Update page',
      status: 'planned',
      summary: 'Update website page content.',
    },
  ],
  'marketing-automation': [
    {
      code: 'sales.marketing_campaign.create',
      label: 'Create campaign',
      status: 'planned',
      summary: 'Create a marketing automation campaign.',
    },
    {
      code: 'sales.marketing_campaign.approve',
      label: 'Activate campaign',
      status: 'planned',
      summary: 'Activate a marketing campaign.',
    },
  ],
  'email-marketing': [
    {
      code: 'sales.mailing.create',
      label: 'Create mailing',
      status: 'planned',
      summary: 'Create an email marketing mailing.',
    },
    {
      code: 'sales.mailing.approve',
      label: 'Send mailing',
      status: 'planned',
      summary: 'Approve and send a mailing.',
    },
  ],
  employees: [
    {
      code: 'jobs.employee.create',
      label: 'Create employee',
      status: 'planned',
      summary: 'Create an employee record.',
    },
    {
      code: 'jobs.employee.update',
      label: 'Update employee',
      status: 'planned',
      summary: 'Update employee profile fields.',
    },
    {
      code: 'jobs.employee.read',
      label: 'Read employee',
      status: 'planned',
      summary: 'Fetch employee details.',
    },
  ],
  attendances: [
    {
      code: 'jobs.attendance.create',
      label: 'Check in / out',
      status: 'planned',
      summary: 'Record attendance check-in or check-out.',
    },
    {
      code: 'jobs.attendance.read',
      label: 'Read attendance',
      status: 'planned',
      summary: 'Fetch attendance records.',
    },
  ],
  fleet: [
    {
      code: 'jobs.vehicle.create',
      label: 'Create vehicle',
      status: 'planned',
      summary: 'Add a fleet vehicle.',
    },
    {
      code: 'jobs.vehicle.update',
      label: 'Update vehicle',
      status: 'planned',
      summary: 'Update vehicle or odometer data.',
    },
    {
      code: 'jobs.fleet_service.create',
      label: 'Log service',
      status: 'planned',
      summary: 'Log a fleet service event.',
    },
  ],
  discuss: [
    {
      code: 'incidents.channel.message',
      label: 'Post message',
      status: 'planned',
      summary: 'Post a Discuss channel message.',
    },
    {
      code: 'incidents.channel.read',
      label: 'Read channel',
      status: 'planned',
      summary: 'Fetch channel messages.',
    },
  ],
  calendar: [
    {
      code: 'jobs.calendar_event.create',
      label: 'Create event',
      status: 'planned',
      summary: 'Create a calendar event.',
    },
    {
      code: 'jobs.calendar_event.update',
      label: 'Update event',
      status: 'planned',
      summary: 'Update a calendar event.',
    },
    {
      code: 'jobs.calendar_event.cancel',
      label: 'Cancel event',
      status: 'planned',
      summary: 'Cancel a calendar event.',
    },
  ],
  dashboards: [
    {
      code: 'logs.dashboard.read',
      label: 'Read dashboard',
      status: 'planned',
      summary: 'Fetch dashboard metrics.',
    },
    {
      code: 'logs.dashboard.refresh',
      label: 'Refresh dashboard',
      status: 'planned',
      summary: 'Refresh dashboard data.',
    },
  ],
  apps: [
    {
      code: 'products.module.read',
      label: 'List modules',
      status: 'planned',
      summary: 'List installed / available apps.',
    },
    {
      code: 'products.module.install',
      label: 'Install module',
      status: 'planned',
      summary: 'Install an Odoo module (high risk).',
    },
  ],
  'sct-documentation': [
    {
      code: 'logs.runbook.read',
      label: 'Read runbook',
      status: 'planned',
      summary: 'Fetch SCT documentation / runbook.',
    },
    {
      code: 'logs.runbook.update',
      label: 'Update runbook',
      status: 'planned',
      summary: 'Update SCT documentation.',
    },
  ],
  settings: [
    {
      code: 'products.config.read',
      label: 'Read settings',
      status: 'planned',
      summary: 'Read ERP / control-plane settings.',
    },
    {
      code: 'products.config.update',
      label: 'Update settings',
      status: 'planned',
      summary: 'Update ERP / control-plane settings.',
    },
    {
      code: 'products.product_template.read',
      label: 'Read product template',
      status: 'known',
      summary: 'Known taxonomy read sample (products).',
    },
  ],
};

export function getSectionIntents(slug: string): SectionIntent[] {
  return SECTION_INTENTS[slug] ?? [];
}

export function getSectionIntent(
  slug: string,
  code: string,
): SectionIntent | undefined {
  return getSectionIntents(slug).find((i) => i.code === code);
}

export type IntentDetail = SectionIntent & {
  objective: string;
  description: string;
  outputColumns: IntentOutputColumn[];
  outputRows: IntentOutputRow[];
  callPath: IntentCallStep[];
  profile: IntentExecutionProfile;
};

/**
 * Deterministic profile classifier.
 * Order: explicit profile → verb / suffix rules → structured default.
 */
export function classifyIntentProfile(
  intent: Pick<SectionIntent, 'code' | 'profile'>,
): IntentExecutionProfile {
  if (intent.profile) {
    const difficulty = intent.profile.difficulty;
    const defaults = defaultsForDifficulty(difficulty, intent.code);
    return {
      ...defaults,
      ...intent.profile,
      difficulty,
      reason:
        intent.profile.reason ??
        `Explicit profile override (${difficulty})`,
    };
  }

  const code = intent.code.toLowerCase();
  const verb = code.split('.')[2] ?? '';

  if (
    verb === 'read' ||
    verb === 'list' ||
    verb.endsWith('_read') ||
    code.includes('.read')
  ) {
    return {
      difficulty: 'simple',
      input_mode: 'structured',
      steps: 'single',
      reason: 'Verb/read rule — single fetch, return data',
    };
  }

  if (
    verb.includes('find_issues') ||
    verb.includes('diagnose') ||
    verb.includes('review') ||
    code.includes('find_issues')
  ) {
    return {
      difficulty: 'diagnostic',
      input_mode: 'structured',
      steps: 'multi',
      reason: 'Diagnostic verb rule — analyze + issue list, no write',
    };
  }

  if (
    verb.includes('from_text') ||
    verb.includes('from_nl') ||
    code.includes('from_text') ||
    code.includes('natural_language')
  ) {
    return {
      difficulty: 'nl_compose',
      input_mode: 'natural_language',
      steps: 'multi',
      reason: 'NL compose verb rule — extract → review → structured write',
    };
  }

  return {
    difficulty: 'structured',
    input_mode: 'structured',
    steps: 'single',
    reason: 'Default mutate rule — typed fields, single ERP call',
  };
}

function defaultsForDifficulty(
  difficulty: IntentDifficulty,
  code: string,
): IntentExecutionProfile {
  switch (difficulty) {
    case 'simple':
      return {
        difficulty,
        input_mode: 'structured',
        steps: 'single',
        reason: `simple · ${code}`,
      };
    case 'diagnostic':
      return {
        difficulty,
        input_mode: 'structured',
        steps: 'multi',
        reason: `diagnostic · ${code}`,
      };
    case 'nl_compose':
      return {
        difficulty,
        input_mode: 'natural_language',
        steps: 'multi',
        reason: `nl_compose · ${code}`,
      };
    default:
      return {
        difficulty: 'structured',
        input_mode: 'structured',
        steps: 'single',
        reason: `structured · ${code}`,
      };
  }
}

export function difficultyLabel(difficulty: IntentDifficulty): string {
  switch (difficulty) {
    case 'simple':
      return 'simple fetch';
    case 'structured':
      return 'structured mutate';
    case 'diagnostic':
      return 'diagnostic';
    case 'nl_compose':
      return 'NL compose';
  }
}

/** Rough Odoo model + method sketch from intent code (dummy until ACL catalog lands). */
function defaultOdooTarget(code: string): { model: string; method: string } {
  const [, entity = 'record', verb = 'read'] = code.split('.');
  const modelMap: Record<string, string> = {
    quotation: 'sale.order',
    estimate: 'sale.order',
    order: 'sale.order',
    lead: 'crm.lead',
    opportunity: 'crm.lead',
    partner: 'res.partner',
    invoice: 'account.move',
    payment: 'account.payment',
    journal_entry: 'account.move',
    stock: 'stock.quant',
    stock_move: 'stock.move',
    stock_quant: 'stock.quant',
    warehouse: 'stock.warehouse',
    purchase_order: 'purchase.order',
    manufacturing_order: 'mrp.production',
    bom: 'mrp.bom',
    workorder: 'mrp.workorder',
    workcenter: 'mrp.workcenter',
    quality_check: 'quality.check',
    quality_alert: 'quality.alert',
    barcode: 'stock.picking',
    website_page: 'website.page',
    marketing_campaign: 'marketing.campaign',
    mailing: 'mailing.mailing',
    employee: 'hr.employee',
    attendance: 'hr.attendance',
    vehicle: 'fleet.vehicle',
    fleet_service: 'fleet.vehicle.log.services',
    channel: 'discuss.channel',
    calendar_event: 'calendar.event',
    dashboard: 'board.board',
    module: 'ir.module.module',
    runbook: 'ir.attachment',
    config: 'res.config.settings',
    product_template: 'product.template',
  };
  const methodMap: Record<string, string> = {
    create: 'create',
    create_from_text: 'create',
    read: 'read',
    update: 'write',
    cancel: 'action_cancel',
    approve: 'action_confirm',
    convert: 'action_convert',
    find_issues: 'read',
    post: 'action_post',
    adjust: 'action_apply_inventory',
    reconcile: 'action_reconcile',
    start: 'button_start',
    close: 'button_finish',
    scan: 'barcode_scan',
    pick: 'action_assign',
    putaway: 'action_putaway',
    publish: 'action_website_publish',
    install: 'button_immediate_install',
    refresh: 'action_refresh',
    message: 'message_post',
  };
  return {
    model: modelMap[entity] ?? `x_${entity}`,
    method: methodMap[verb] ?? verb,
  };
}

function defaultCallPath(
  code: string,
  profile: IntentExecutionProfile,
): IntentCallStep[] {
  const { model, method } = defaultOdooTarget(code);
  const skill =
    code === 'inventory.stock.adjust' || code === 'accounting.invoice.post'
      ? 'POST /skills/dry-run'
      : 'POST /skills/execute';

  if (profile.difficulty === 'simple') {
    return [
      { label: code, detail: 'intent' },
      { label: skill, detail: 'app endpoint' },
      { label: `${model}.${method}`, detail: 'adapter method' },
      { label: 'POST /jsonrpc', detail: 'odoo endpoint' },
    ];
  }

  if (profile.difficulty === 'diagnostic') {
    return [
      { label: code, detail: 'intent' },
      { label: skill, detail: 'app endpoint' },
      { label: 'rule_engine.evaluate', detail: 'diagnostic method' },
      { label: `${model}.read`, detail: 'adapter method' },
      { label: 'POST /jsonrpc', detail: 'odoo endpoint' },
    ];
  }

  if (profile.difficulty === 'nl_compose') {
    return [
      { label: code, detail: 'intent' },
      { label: skill, detail: 'app endpoint' },
      { label: 'nl_extract.ground', detail: 'NL method' },
      { label: `${model}.${method}`, detail: 'adapter method' },
      { label: 'POST /jsonrpc', detail: 'odoo endpoint' },
    ];
  }

  return [
    { label: code, detail: 'intent' },
    { label: skill, detail: 'app endpoint' },
    { label: `${model}.${method}`, detail: 'adapter method' },
    { label: 'POST /jsonrpc', detail: 'odoo endpoint' },
  ];
}

function defaultColumns(code: string): IntentOutputColumn[] {
  const entity = (code.split('.')[1] ?? 'record').replaceAll('_', ' ');
  return [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'entity', label: entity },
    { key: 'state', label: 'State' },
    { key: 'updated_at', label: 'Updated' },
    { key: 'source', label: 'Source' },
  ];
}

function defaultRows(code: string, label: string): IntentOutputRow[] {
  const entity = code.split('.')[1] ?? 'record';
  const verb = code.split('.')[2] ?? 'run';
  const stamp = '2026-07-22 10:14';
  return [
    {
      id: `DEMO-${entity.slice(0, 3).toUpperCase()}-1001`,
      name: `${label} sample A`,
      entity,
      state: verb === 'read' ? 'synced' : 'draft',
      updated_at: stamp,
      source: 'odoo.simulate',
    },
    {
      id: `DEMO-${entity.slice(0, 3).toUpperCase()}-1002`,
      name: `${label} sample B`,
      entity,
      state: verb === 'cancel' ? 'cancelled' : 'posted',
      updated_at: stamp,
      source: 'odoo.simulate',
    },
    {
      id: `DEMO-${entity.slice(0, 3).toUpperCase()}-1003`,
      name: `${label} sample C`,
      entity,
      state: 'needs_approval',
      updated_at: stamp,
      source: 'control-plane',
    },
  ];
}

/** Resolve display fields + dummy output table for an intent. */
export function resolveIntentDetail(intent: SectionIntent): IntentDetail {
  const profile = classifyIntentProfile(intent);
  const objective =
    intent.objective ??
    `Complete “${intent.label}” against the mapped Odoo model without guessing the intent code.`;
  const description =
    intent.description ??
    `${intent.summary} Operators pick this intent from the section rail; the control plane classifies and routes it to the ERP adapter. Output below is dummy data until live results are wired.`;

  return {
    ...intent,
    objective,
    description,
    profile,
    outputColumns: intent.outputColumns ?? defaultColumns(intent.code),
    outputRows: intent.outputRows ?? defaultRows(intent.code, intent.label),
    callPath: intent.callPath ?? defaultCallPath(intent.code, profile),
  };
}

export function intentDomain(code: string): string {
  return code.split('.')[0] ?? '';
}

export function consoleHrefForIntent(code: string): string {
  const domain = intentDomain(code);
  const q = new URLSearchParams({
    intent_code: code,
    domain,
  });
  return `/console?${q.toString()}`;
}
