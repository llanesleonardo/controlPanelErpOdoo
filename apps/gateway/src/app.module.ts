import './env';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { LoggingModule } from './common/logging/logging.module';
import { StorageModule } from './common/storage/storage.module';
import { RequestContextMiddleware } from './common/correlation/request-context.middleware';
import { ActorRateLimitGuard } from './common/rate-limit/actor-rate-limit.guard';
import { HealthController } from './health.controller';
import { LogsModule } from './logs/logs.module';
import { IntentsModule } from './intents/intents.module';
import { TasksModule } from './tasks/tasks.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    PrismaModule,
    LoggingModule,
    StorageModule,
    ThrottlerModule.forRoot([
      {
        ttl: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000),
        limit: Number(process.env.RATE_LIMIT_MAX ?? 100),
      },
    ]),
    LogsModule,
    IntentsModule,
    TasksModule,
    IntegrationsModule,
    SkillsModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ActorRateLimitGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
