import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { OntologyService } from './ontology.service';

@Controller('ontology')
export class OntologyController {
  constructor(private readonly ontology: OntologyService) {}

  @Get()
  list() {
    return this.ontology.listCatalog();
  }

  /** Object Explorer — Gap 05 first slice (live Estimate + demo stubs). */
  @Get('objects')
  listObjects(
    @Query('entity_type') entityType: string,
    @Query('q') q?: string,
    @Query('limit') limit?: string,
    @Headers('x-actor-id') actorId?: string,
    @Headers('x-correlation-id') correlationId?: string,
  ) {
    return this.ontology.listObjects({
      entity_type: entityType,
      q,
      limit: limit ? Number(limit) : undefined,
      actor_id: actorId || 'dev-operator',
      correlation_id: correlationId,
    });
  }

  @Get('entity-types/:id')
  getEntityType(@Param('id') id: string) {
    return this.ontology.getEntityType(id);
  }
}
