import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { StructuredLogger } from '../common/logging/structured-logger.service';
import { OrchestratorClient } from '../tasks/orchestrator.client';

@Injectable()
export class SkillsService {
  constructor(
    private readonly orchestrator: OrchestratorClient,
    private readonly logger: StructuredLogger,
  ) {}

  async execute(params: {
    intent_code: string;
    input?: Record<string, unknown>;
    actor_id: string;
    correlation_id?: string;
  }) {
    const correlation_id = params.correlation_id || randomUUID();
    this.logger.log(
      `skill execute ${params.intent_code}`,
      'SkillsService',
    );
    return this.orchestrator.execute({
      intent_code: params.intent_code,
      input: params.input ?? {},
      correlation_id,
      actor_id: params.actor_id,
    });
  }
}
