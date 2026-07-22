import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import {
  IntegrationsService,
  UpsertOdooIntegrationDto,
} from './integrations.service';

@Controller('integrations/odoo')
export class IntegrationsController {
  constructor(private readonly integrations: IntegrationsService) {}

  @Get()
  get() {
    return this.integrations.getOdooConfig();
  }

  @Put()
  put(@Body() body: UpsertOdooIntegrationDto) {
    return this.integrations.putOdooConfig(body ?? {});
  }

  @Post('test')
  test() {
    return this.integrations.testOdoo();
  }
}
