import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { OrchestratorClient } from './orchestrator.client';
import { IntentsModule } from '../intents/intents.module';

@Module({
  imports: [IntentsModule],
  controllers: [TasksController],
  providers: [TasksService, OrchestratorClient],
  exports: [OrchestratorClient],
})
export class TasksModule {}
