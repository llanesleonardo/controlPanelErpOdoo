import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { requestContext } from '../logging/structured-logger.service';
import { DEFAULT_ACTOR_ID } from '../actor/actor.middleware';
import {
  loadDeploymentSettings,
  resolveTenantId,
} from '../../config/deployment.settings';

const deploymentSettings = loadDeploymentSettings();

declare global {
  namespace Express {
    interface Request {
      correlationId?: string;
      actorId?: string;
      tenantId?: string;
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

    const tenantId = resolveTenantId(
      req.header('x-tenant-id') ?? undefined,
      deploymentSettings,
    );

    req.correlationId = correlationId;
    req.actorId = actorId;
    req.tenantId = tenantId;
    res.setHeader('X-Correlation-Id', correlationId);
    if (deploymentSettings.mode === 'multi_tenant') {
      res.setHeader('X-Tenant-Id', tenantId);
    }

    requestContext.run({ correlationId, actorId, tenantId }, () => next());
  }
}
