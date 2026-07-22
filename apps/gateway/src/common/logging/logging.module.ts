import { Global, Module } from '@nestjs/common';
import { StructuredLogger } from './structured-logger.service';
import { LogStoreService } from './log-store.service';

@Global()
@Module({
  providers: [LogStoreService, StructuredLogger],
  exports: [LogStoreService, StructuredLogger],
})
export class LoggingModule {}
