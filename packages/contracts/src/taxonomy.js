/**
 * Controlled vocabulary — keep in sync with docs/Components/TaxonomyDocs/
 * @typedef {'sales'|'inventory'|'purchasing'|'accounting'|'customers'|'vendors'|'products'|'jobs'|'incidents'|'logs'} Domain
 */

/** @type {readonly Domain[]} */
export const DOMAINS = Object.freeze([
  'sales',
  'inventory',
  'purchasing',
  'accounting',
  'customers',
  'vendors',
  'products',
  'jobs',
  'incidents',
  'logs',
]);

export const ENTITIES = Object.freeze([
  'sales_order',
  'quotation',
  'invoice',
  'stock_move',
  'stock_quant',
  'warehouse',
  'partner',
  'product_template',
  'product_product',
  'payment',
  'purchase_order',
  'journal_entry',
  'task',
  'incident',
  'runbook',
  'audit_event',
]);

export const VERBS = Object.freeze([
  'create',
  'read',
  'update',
  'cancel',
  'approve',
  'reconcile',
  'allocate',
  'reserve',
  'close',
  'adjust',
  'post',
]);

export const RESULT_STATES = Object.freeze([
  'accepted',
  'rejected',
  'needs_approval',
  'executed',
  'failed',
  'rolled_back',
  'verified',
]);

export const ERROR_CLASSES = Object.freeze([
  'validation_error',
  'policy_violation',
  'dependency_failure',
  'odoo_rejection',
  'timeout',
  'data_conflict',
]);

export const APPROVAL_LEVELS = Object.freeze([
  'none',
  'operator',
  'manager',
  'admin',
]);

/** Known sample intent codes from ContractsDocs / TaxonomyDocs */
export const KNOWN_INTENT_CODES = Object.freeze([
  'sales.order.create',
  'sales.order.read',
  'sales.quote.read',
  'sales.estimate.read',
  'sales.estimate.create',
  'sales.estimate.find_issues',
  'contacts.contact.read',
  'inventory.stock.adjust',
  'inventory.item.read',
  'purchasing.order.read',
  'manufacturing.order.read',
  'manufacturing.shop_floor.read',
  'quality.check.read',
  'hr.employee.read',
  'hr.attendance.read',
  'docs.sct_document.read',
  'accounting.invoice.post',
  'customers.partner.update',
  'products.product_template.read',
]);

/**
 * @param {string} domain
 * @param {string} entity
 * @param {string} verb
 */
export function intentCode(domain, entity, verb) {
  return `${domain}.${entity}.${verb}`;
}

/**
 * @param {string} code
 */
export function isKnownIntentCode(code) {
  return KNOWN_INTENT_CODES.includes(code);
}
