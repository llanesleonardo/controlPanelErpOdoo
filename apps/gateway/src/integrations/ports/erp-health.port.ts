/** Domain port — ERP health without vendor types. */
export type ErpHealthStatus = 'ok' | 'degraded' | 'down';

export interface ErpHealthResult {
  status: ErpHealthStatus;
  simulated: boolean;
  message?: string;
  error_class?: string;
}

export interface ErpConnectionSettings {
  url: string;
  dbName: string;
  username: string;
  secret: string;
  mode: 'live' | 'simulate';
}

export interface ErpHealthPort {
  check(settings: ErpConnectionSettings): Promise<ErpHealthResult>;
}

export const ERP_HEALTH_PORT = Symbol('ERP_HEALTH_PORT');
