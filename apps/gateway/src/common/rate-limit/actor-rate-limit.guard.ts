import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class ActorRateLimitGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, unknown>): Promise<string> {
    const request = req as unknown as Request;
    const actorId = request.actorId ?? request.headers?.['x-actor-id'];
    if (typeof actorId === 'string' && actorId.length > 0) {
      return `actor:${actorId}`;
    }
    const forwarded = request.headers?.['x-forwarded-for'];
    const ip =
      request.ip ||
      request.socket?.remoteAddress ||
      (typeof forwarded === 'string' ? forwarded : 'unknown');
    return `ip:${ip}`;
  }

  protected async throwThrottlingException(): Promise<void> {
    throw new HttpException(
      {
        statusCode: 429,
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Slow down and retry later.',
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
