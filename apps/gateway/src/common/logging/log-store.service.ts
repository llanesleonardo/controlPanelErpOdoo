import { Injectable } from '@nestjs/common';
import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface StructuredLogEntry {
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
  correlation_id?: string;
  actor_id?: string;
  context?: string;
  [key: string]: unknown;
}

@Injectable()
export class LogStoreService {
  private readonly service = process.env.SERVICE_NAME ?? 'gateway';
  private readonly logDir =
    process.env.LOG_DIR ?? join(process.cwd(), '..', '..', 'resources', 'logs');
  private readonly ring: StructuredLogEntry[] = [];
  private readonly ringMax = Number(process.env.LOG_RING_MAX ?? 2000);

  constructor() {
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir, { recursive: true });
    }
  }

  write(entry: StructuredLogEntry) {
    const full: StructuredLogEntry = {
      ...entry,
      service: entry.service ?? this.service,
      timestamp: entry.timestamp ?? new Date().toISOString(),
    };
    this.ring.push(full);
    if (this.ring.length > this.ringMax) {
      this.ring.splice(0, this.ring.length - this.ringMax);
    }
    const day = full.timestamp.slice(0, 10);
    const file = join(this.logDir, `${this.service}-${day}.jsonl`);
    appendFileSync(file, `${JSON.stringify(full)}\n`, 'utf8');
  }

  query(opts: {
    correlation_id?: string;
    limit?: number;
  }): StructuredLogEntry[] {
    const limit = Math.min(opts.limit ?? 100, 500);
    let entries = [...this.ring].reverse();

    if (opts.correlation_id) {
      entries = entries.filter(
        (e) => e.correlation_id === opts.correlation_id,
      );
    }

    if (entries.length < limit && opts.correlation_id) {
      const fromFiles = this.readRecentFromFiles(opts.correlation_id, limit);
      const seen = new Set(entries.map((e) => `${e.timestamp}|${e.message}`));
      for (const e of fromFiles) {
        const key = `${e.timestamp}|${e.message}`;
        if (!seen.has(key)) {
          entries.push(e);
          seen.add(key);
        }
      }
    }

    return entries.slice(0, limit);
  }

  private readRecentFromFiles(
    correlationId: string,
    limit: number,
  ): StructuredLogEntry[] {
    if (!existsSync(this.logDir)) return [];
    const files = readdirSync(this.logDir)
      .filter((f) => f.endsWith('.jsonl'))
      .sort()
      .reverse()
      .slice(0, 3);

    const matched: StructuredLogEntry[] = [];
    for (const file of files) {
      const lines = readFileSync(join(this.logDir, file), 'utf8')
        .trim()
        .split('\n')
        .filter(Boolean)
        .reverse();
      for (const line of lines) {
        try {
          const entry = JSON.parse(line) as StructuredLogEntry;
          if (entry.correlation_id === correlationId) {
            matched.push(entry);
            if (matched.length >= limit) return matched;
          }
        } catch {
          // skip bad lines
        }
      }
    }
    return matched;
  }
}
