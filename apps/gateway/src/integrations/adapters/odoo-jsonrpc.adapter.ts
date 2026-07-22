import { Injectable } from '@nestjs/common';
import {
  ErpConnectionSettings,
  ErpHealthPort,
  ErpHealthResult,
} from '../ports/erp-health.port';

/**
 * Tiny circuit breaker — adapter-local (not used by skill facade).
 */
class CircuitBreaker {
  private failures = 0;
  private openedAt = 0;
  constructor(
    private readonly threshold = 3,
    private readonly coolMs = 30_000,
  ) {}

  get open(): boolean {
    if (this.failures < this.threshold) return false;
    if (Date.now() - this.openedAt > this.coolMs) {
      this.failures = 0;
      return false;
    }
    return true;
  }

  success() {
    this.failures = 0;
  }

  fail() {
    this.failures += 1;
    if (this.failures >= this.threshold) this.openedAt = Date.now();
  }
}

/**
 * Odoo JSON-RPC adapter implementing ErpHealthPort (ACL / Adapter).
 * Only place in gateway that speaks JSON-RPC.
 */
@Injectable()
export class OdooJsonRpcAdapter implements ErpHealthPort {
  private readonly breaker = new CircuitBreaker();

  async check(settings: ErpConnectionSettings): Promise<ErpHealthResult> {
    if (settings.mode === 'simulate') {
      return {
        status: 'ok',
        simulated: true,
        message: 'Simulated ERP health (no RPC)',
      };
    }

    if (this.breaker.open) {
      return {
        status: 'down',
        simulated: false,
        message: 'Circuit open — ERP calls paused briefly',
        error_class: 'dependency_failure',
      };
    }

    if (!settings.url || !settings.dbName) {
      return {
        status: 'degraded',
        simulated: false,
        message: 'Missing URL or database name',
        error_class: 'validation_error',
      };
    }

    try {
      const version = await this.rpc(settings.url, 'common', 'version', [], 1);
      if (!version) {
        this.breaker.fail();
        return {
          status: 'down',
          simulated: false,
          message: 'No version response',
          error_class: 'dependency_failure',
        };
      }

      const secret = settings.secret;
      if (!secret || !settings.username) {
        this.breaker.success();
        return {
          status: 'degraded',
          simulated: false,
          message: 'Reachable but credentials incomplete',
          error_class: 'validation_error',
        };
      }

      const uid = await this.rpc(
        settings.url,
        'common',
        'authenticate',
        [settings.dbName, settings.username, secret, {}],
        2,
      );

      if (!uid || uid === false) {
        this.breaker.fail();
        return {
          status: 'degraded',
          simulated: false,
          message: 'Authentication failed',
          error_class: 'odoo_rejection',
        };
      }

      this.breaker.success();
      return {
        status: 'ok',
        simulated: false,
        message: 'Version and authenticate succeeded',
      };
    } catch (err) {
      this.breaker.fail();
      return {
        status: 'down',
        simulated: false,
        message: err instanceof Error ? err.message : 'ERP unreachable',
        error_class: 'dependency_failure',
      };
    }
  }

  private async rpc(
    baseUrl: string,
    service: string,
    method: string,
    args: unknown[],
    attempts: number,
  ): Promise<unknown> {
    const endpoint = `${baseUrl.replace(/\/$/, '')}/jsonrpc`;
    let lastError: unknown;
    for (let i = 0; i < attempts; i++) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'call',
            params: { service, method, args },
            id: Date.now(),
          }),
          signal: AbortSignal.timeout(8_000),
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const body = (await res.json()) as {
          result?: unknown;
          error?: { message?: string };
        };
        if (body.error) {
          throw new Error(body.error.message ?? 'JSON-RPC error');
        }
        return body.result;
      } catch (err) {
        lastError = err;
        if (i < attempts - 1) {
          await new Promise((r) => setTimeout(r, 200 * (i + 1)));
        }
      }
    }
    throw lastError instanceof Error
      ? lastError
      : new Error('JSON-RPC failed');
  }
}
