import { Body, Controller, Headers, Post } from '@nestjs/common';
import { SkillsService } from './skills.service';

type ExecuteBody = {
  intent_code: string;
  input?: Record<string, unknown>;
};

@Controller('skills')
export class SkillsController {
  constructor(private readonly skills: SkillsService) {}

  @Post('execute')
  execute(
    @Body() body: ExecuteBody,
    @Headers('x-actor-id') actorId?: string,
    @Headers('x-correlation-id') correlationId?: string,
  ) {
    return this.skills.execute({
      intent_code: body.intent_code,
      input: body.input,
      actor_id: actorId || 'dev-operator',
      correlation_id: correlationId,
    });
  }
}
