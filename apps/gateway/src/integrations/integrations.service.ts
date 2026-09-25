import { Inject, Injectable } from '@nestjs/common';
import { ErpConnectorStatus, ErpProvider, Prisma } from '@prisma/client';
import { loadConnectorsCatalog } from '@control-panel-ontology/ontology';
import { PrismaService } from '../prisma/prisma.service';
import { StructuredLogger } from '../common/logging/structured-logger.service';
import {
  ERP_HEALTH_PORT,
  ErpConnectionSettings,
  ErpHealthPort,
} from './ports/erp-health.port';

type CatalogConnector = {
  connector_id: string;
  kind: string;
  label: string;
  status: string;
  modes: string[];
  notes?: string;
  supported_skills?: string[];
};

export type ConnectorCatalogHealth = {
  status: string;
  mode?: string;
  simulated: boolean;
  message?: string | null;
  checked_at?: string | null;
};

export type ConnectorCatalogEntry = CatalogConnector & {
  health: ConnectorCatalogHealth;
};

export interface UpsertOdooIntegrationDto {
  url?: string;
  db_name?: string;
  username?: string;
  secret?: string;
  clear_secret?: boolean;
}

@Injectable()
export class IntegrationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: StructuredLogger,
    @Inject(ERP_HEALTH_PORT) private readonly erpHealth: ErpHealthPort,
  ) {}

  async getConnectorCatalog(): Promise<{ connectors: ConnectorCatalogEntry[] }> {
    const { connectors } = loadConnectorsCatalog();
    const odoo = await this.getOdooConfig();
    const list = (connectors as CatalogConnector[]).map((c) => ({
      ...c,
      health: this.healthForCatalogEntry(c, odoo),
    }));
    return { connectors: list };
  }

  private healthForCatalogEntry(
    c: CatalogConnector,
    odoo: Awaited<ReturnType<IntegrationsService['getOdooConfig']>>,
  ): ConnectorCatalogHealth {
    if (c.connector_id === 'odoo') {
      return {
        status: String(odoo.status),
        mode: odoo.mode,
        simulated: odoo.mode === 'simulate',
        message: odoo.last_error,
        checked_at: odoo.last_checked_at
          ? new Date(odoo.last_checked_at).toISOString()
          : null,
      };
    }
    return {
      status: 'stub_simulate',
      simulated: true,
      message:
        c.notes ??
        'Architecture stub — multi-edge pattern; live peer closes in OPS TR.',
    };
  }

  async getOdooConfig() {
    const row = await this.ensureRow();
    const fromEnv = this.envSettings();
    return {
      provider: row.provider,
      url: row.url || fromEnv.url,
      db_name: row.dbName || fromEnv.dbName,
      username: row.username || fromEnv.username,
      secret_configured: Boolean(row.secret || fromEnv.secret),
      source: {
        url: row.url ? 'db' : fromEnv.url ? 'env' : 'empty',
        credentials: row.secret
          ? 'db'
          : fromEnv.secret
            ? 'env'
            : 'empty',
      },
      mode: this.erpMode(),
      last_checked_at: row.lastCheckedAt,
      status: row.status,
      last_error: row.lastError,
    };
  }

  async putOdooConfig(dto: UpsertOdooIntegrationDto) {
    const row = await this.ensureRow();
    const data: Prisma.ErpConnectorConfigUpdateInput = {};
    if (dto.url !== undefined) data.url = dto.url.trim();
    if (dto.db_name !== undefined) data.dbName = dto.db_name.trim();
    if (dto.username !== undefined) data.username = dto.username.trim();
    if (dto.clear_secret) data.secret = '';
    else if (dto.secret !== undefined && dto.secret.length > 0) {
      data.secret = dto.secret;
    }

    const updated = await this.prisma.erpConnectorConfig.update({
      where: { id: row.id },
      data,
    });

    this.logger.log('ERP connector config updated (odoo)', 'IntegrationsService');
    return this.getOdooConfig();
  }

  async testOdoo() {
    const settings = await this.resolveSettings();
    const result = await this.erpHealth.check(settings);
    const status = result.status as ErpConnectorStatus;

    await this.prisma.erpConnectorConfig.update({
      where: { key: 'default' },
      data: {
        status,
        lastCheckedAt: new Date(),
        lastError: result.status === 'ok' ? null : (result.message ?? null),
      },
    });

    this.logger.log(
      `ERP health test → ${result.status} simulated=${result.simulated}`,
      'IntegrationsService',
    );

    return {
      ...result,
      provider: 'odoo',
      checked_at: new Date().toISOString(),
    };
  }

  private async ensureRow() {
    const existing = await this.prisma.erpConnectorConfig.findUnique({
      where: { key: 'default' },
    });
    if (existing) return existing;
    return this.prisma.erpConnectorConfig.create({
      data: {
        key: 'default',
        provider: ErpProvider.odoo,
        status: ErpConnectorStatus.unknown,
      },
    });
  }

  private erpMode(): 'live' | 'simulate' {
    const mode = (
      process.env.ERP_MODE ??
      process.env.ODOO_MODE ??
      'simulate'
    ).toLowerCase();
    return mode === 'live' ? 'live' : 'simulate';
  }

  private envSettings(): ErpConnectionSettings {
    return {
      url: process.env.ODOO_URL ?? '',
      dbName: process.env.ODOO_DB ?? '',
      username: process.env.ODOO_USERNAME ?? '',
      secret: process.env.ODOO_API_KEY || process.env.ODOO_PASSWORD || '',
      mode: this.erpMode(),
    };
  }

  private async resolveSettings(): Promise<ErpConnectionSettings> {
    const row = await this.ensureRow();
    const env = this.envSettings();
    return {
      url: row.url || env.url,
      dbName: row.dbName || env.dbName,
      username: row.username || env.username,
      secret: row.secret || env.secret,
      mode: this.erpMode(),
    };
  }
}
