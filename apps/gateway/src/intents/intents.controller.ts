import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { IntentsService, ClassifyInput } from './intents.service';
import { StructuredLogger } from '../common/logging/structured-logger.service';

@Controller('intents')
export class IntentsController {
  constructor(
    private readonly intents: IntentsService,
    private readonly logger: StructuredLogger,
  ) {}

  @Post('classify')
  classify(@Body() body: ClassifyInput, @Req() req: Request) {
    const result = this.intents.classify(body ?? {});
    this.logger.log(
      `classify → ${result.intent_code ?? 'none'} (${result.matched_by})`,
      'IntentsController',
    );
    return {
      ...result,
      correlation_id: req.correlationId,
      actor_id: req.actorId,
    };
  }
}
