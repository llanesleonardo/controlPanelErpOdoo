import { Module } from '@nestjs/common';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { OdooJsonRpcAdapter } from './adapters/odoo-jsonrpc.adapter';
import { ERP_HEALTH_PORT } from './ports/erp-health.port';

@Module({
  controllers: [IntegrationsController],
  providers: [
    IntegrationsService,
    OdooJsonRpcAdapter,
    {
      provide: ERP_HEALTH_PORT,
      useExisting: OdooJsonRpcAdapter,
    },
  ],
  exports: [IntegrationsService],
})
export class IntegrationsModule {}
