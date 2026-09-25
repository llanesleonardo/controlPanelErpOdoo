export type DeploymentMode = 'single_tenant' | 'multi_tenant';

export type DeploymentSettings = {
  mode: DeploymentMode;
  /** Default tenant: sole tenant in single_tenant; fallback when X-Tenant-Id omitted in multi_tenant. */
  tenantId: string;
  /** Product-owned rebind pack id (ontology + catalog baseline). */
  profile: string;
};

const MODES: DeploymentMode[] = ['single_tenant', 'multi_tenant'];

function normalizeMode(raw: string | undefined): DeploymentMode {
  const v = (raw ?? 'single_tenant').toLowerCase().replace(/-/g, '_');
  return MODES.includes(v as DeploymentMode)
    ? (v as DeploymentMode)
    : 'single_tenant';
}

export function loadDeploymentSettings(): DeploymentSettings {
  return {
    mode: normalizeMode(process.env.DEPLOYMENT_MODE),
    tenantId: (process.env.TENANT_ID ?? 'default').trim() || 'default',
    profile:
      (process.env.DEPLOYMENT_PROFILE ?? 'reference_carbide').trim() ||
      'reference_carbide',
  };
}

/** Resolve effective tenant for this request (see SAC-009 Deployment_Tenancy_Env guide). */
export function resolveTenantId(
  tenantHeader: string | undefined,
  settings: DeploymentSettings,
): string {
  if (settings.mode === 'multi_tenant') {
    const h = tenantHeader?.trim();
    if (h) return h;
    return settings.tenantId;
  }
  return settings.tenantId;
}

export function deploymentSettingsForApi(settings: DeploymentSettings) {
  return {
    mode: settings.mode,
    tenant_id: settings.tenantId,
    profile: settings.profile,
    tenant_header: settings.mode === 'multi_tenant' ? 'X-Tenant-Id' : null,
  };
}
