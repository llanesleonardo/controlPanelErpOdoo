import { Injectable } from '@nestjs/common';
import { StructuredLogger } from '../common/logging/structured-logger.service';

export interface DryRunRequest {
  intent_code: string;
  input: Record<string, unknown>;
  correlation_id: string;
  actor_id: string;
}

export interface DryRunResponse {
  ok: boolean;
  intent_code?: string;
  skill_id?: string;
  predicted_effects?: unknown[];
  warnings?: string[];
  mode?: string;
  adapter?: { provider?: string; mode?: string };
  evidence_path?: string;
  correlation_id?: string;
  message?: string;
  error_class?: string;
  detail?: unknown;
}

@Injectable()
export class OrchestratorClient {
  private readonly baseUrl = (
    process.env.ORCHESTRATOR_URL ?? 'http://localhost:8000'
  ).replace(/\/$/, '');

  constructor(private readonly logger: StructuredLogger) {}

  async dryRun(req: DryRunRequest): Promise<DryRunResponse> {
    const url = `${this.baseUrl}/skills/dry-run`;
    this.logger.log(
      `orchestrator dry-run ${req.intent_code}`,
      'OrchestratorClient',
    );

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-Id': req.correlation_id,
        'X-Actor-Id': req.actor_id,
      },
      body: JSON.stringify({
        intent_code: req.intent_code,
        input: req.input,
        correlation_id: req.correlation_id,
        actor_id: req.actor_id,
      }),
      signal: AbortSignal.timeout(20_000),
    });

    const body = (await res.json().catch(() => ({}))) as DryRunResponse & {
      detail?: DryRunResponse;
    };

    if (!res.ok) {
      const detail = body.detail ?? body;
      return {
        ok: false,
        message:
          typeof detail === 'object' && detail && 'message' in detail
            ? String((detail as DryRunResponse).message)
            : `Orchestrator HTTP ${res.status}`,
        error_class:
          typeof detail === 'object' && detail && 'error_class' in detail
            ? String((detail as DryRunResponse).error_class)
            : 'dependency_failure',
        detail,
      };
    }

    return { ...body, ok: true };
  }
}
