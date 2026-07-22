import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { requestContext } from '../logging/structured-logger.service';

export const DEFAULT_ACTOR_ID = 'dev-operator';

@Injectable()
export class ActorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const header = req.header('x-actor-id')?.trim();
    const actorId =
      header && header.length > 0 ? header : DEFAULT_ACTOR_ID;
    req.actorId = actorId;

    const existing = requestContext.getStore() ?? {};
    requestContext.run({ ...existing, actorId }, () => next());
  }
}
