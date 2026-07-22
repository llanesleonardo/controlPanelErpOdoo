import { Controller, Get, Query } from '@nestjs/common';
import { LogStoreService } from '../common/logging/log-store.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logStore: LogStoreService) {}

  @Get()
  list(
    @Query('correlation_id') correlationId?: string,
    @Query('limit') limitRaw?: string,
  ) {
    const limit = limitRaw ? Number(limitRaw) : 100;
    return {
      items: this.logStore.query({
        correlation_id: correlationId,
        limit: Number.isFinite(limit) ? limit : 100,
      }),
    };
  }
}
