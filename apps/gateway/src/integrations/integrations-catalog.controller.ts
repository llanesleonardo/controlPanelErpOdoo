import { Controller, Get } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';

@Controller('integrations')
export class IntegrationsCatalogController {
  constructor(private readonly integrations: IntegrationsService) {}

  @Get('catalog')
  getCatalog() {
    return this.integrations.getConnectorCatalog();
  }
}
