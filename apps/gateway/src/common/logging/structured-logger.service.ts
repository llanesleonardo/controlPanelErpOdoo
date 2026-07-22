import { ConsoleLogger, Injectable, LogLevel, Optional } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { LogStoreService } from './log-store.service';

export interface RequestContext {
  correlationId?: string;
  actorId?: string;
}

export const requestContext = new AsyncLocalStorage<RequestContext>();

@Injectable()
export class StructuredLogger extends ConsoleLogger {
  constructor(@Optional() private readonly store?: LogStoreService) {
    super();
  }

  protected formatMessage(
    level: LogLevel,
    message: unknown,
    context?: string,
  ): string {
    return typeof message === 'string' ? message : JSON.stringify(message);
  }

  private persist(level: 'debug' | 'info' | 'warn' | 'error', message: unknown, context?: string) {
    if (!this.store) return;
    const ctx = requestContext.getStore();
    this.store.write({
      timestamp: new Date().toISOString(),
      level,
      service: process.env.SERVICE_NAME ?? 'gateway',
      message: typeof message === 'string' ? message : JSON.stringify(message),
      context,
      correlation_id: ctx?.correlationId,
      actor_id: ctx?.actorId,
    });
  }

  log(message: unknown, context?: string) {
    this.persist('info', message, context);
    super.log(message, context);
  }

  error(message: unknown, stackOrContext?: string, context?: string) {
    this.persist('error', message, context ?? stackOrContext);
    super.error(message, stackOrContext, context);
  }

  warn(message: unknown, context?: string) {
    this.persist('warn', message, context);
    super.warn(message, context);
  }

  debug(message: unknown, context?: string) {
    this.persist('debug', message, context);
    super.debug(message, context);
  }

  verbose(message: unknown, context?: string) {
    this.persist('debug', message, context);
    super.verbose(message, context);
  }
}
