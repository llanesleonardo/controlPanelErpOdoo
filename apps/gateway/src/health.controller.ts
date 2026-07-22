import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { StorageService } from './common/storage/storage.service';

@Controller('health')
export class HealthController {
  constructor(private readonly storage: StorageService) {}

  @Get()
  @SkipThrottle()
  getHealth() {
    const storageOk = this.storage.isWritable();
    return {
      status: storageOk ? 'ok' : 'degraded',
      service: 'gateway',
      checks: {
        storage: storageOk,
        storage_root: this.storage.getRoot(),
      },
    };
  }
}
