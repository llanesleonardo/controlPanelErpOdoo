import './env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StructuredLogger } from './common/logging/structured-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(StructuredLogger);
  app.useLogger(logger);

  app.enableCors({
    origin: process.env.WEB_ORIGIN?.split(',') ?? [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Actor-Id',
      'X-Tenant-Id',
      'X-Correlation-Id',
    ],
    exposedHeaders: ['X-Correlation-Id', 'X-Tenant-Id'],
  });

  const port = Number(process.env.GATEWAY_PORT ?? 3001);
  await app.listen(port);
  logger.log(`Gateway listening on :${port}`, 'Bootstrap');
}

bootstrap();
