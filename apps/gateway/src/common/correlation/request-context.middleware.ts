import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { requestContext } from '../logging/structured-logger.service';
import { DEFAULT_ACTOR_ID } from '../actor/actor.middleware';

declare global {
  namespace Express {
    interface Request {
      correlationId?: string;
      actorId?: string;
    }
  }
}

/** Single ALS scope for correlation + actor (Observability / Correlation Identifier). */
@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const incoming = req.header('x-correlation-id')?.trim();
    const correlationId =
      incoming && incoming.length > 0 ? incoming : uuidv4();
    const actorHeader = req.header('x-actor-id')?.trim();
    const actorId =
      actorHeader && actorHeader.length > 0
        ? actorHeader
        : DEFAULT_ACTOR_ID;

    req.correlationId = correlationId;
    req.actorId = actorId;
    res.setHeader('X-Correlation-Id', correlationId);

    requestContext.run({ correlationId, actorId }, () => next());
  }
}
