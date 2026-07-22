import { Injectable, OnModuleInit } from '@nestjs/common';

type ContractsModule = typeof import('@control-panel-erp/contracts');

export interface ClassifyInput {
  domain?: string;
  text?: string;
  intent_code?: string;
  structured?: Record<string, unknown>;
}

export interface ClassifyResult {
  intent_code: string | null;
  domain: string | null;
  confidence: 'high' | 'medium' | 'low' | 'none';
  matched_by: 'explicit' | 'domain_hint' | 'text' | 'none';
  candidates: string[];
  known: boolean;
}

@Injectable()
export class IntentsService implements OnModuleInit {
  private contracts!: ContractsModule;

  async onModuleInit() {
    this.contracts = await import('@control-panel-erp/contracts');
  }

  classify(input: ClassifyInput): ClassifyResult {
    const known = this.contracts.KNOWN_INTENT_CODES as readonly string[];

    if (input.intent_code) {
      const code = input.intent_code.trim();
      return {
        intent_code: code,
        domain: code.split('.')[0] ?? null,
        confidence: 'high',
        matched_by: 'explicit',
        candidates: known.filter((c) => c === code || c.startsWith(`${code}.`)),
        known: this.contracts.isKnownIntentCode(code),
      };
    }

    const domain = input.domain?.trim().toLowerCase();
    const text = (input.text ?? '').trim().toLowerCase();

    if (domain && this.contracts.DOMAINS.includes(domain as never)) {
      const byDomain = known.filter((c) => c.startsWith(`${domain}.`));
      const textHit = text
        ? byDomain.find(
            (c) =>
              text.includes(c.split('.').slice(1).join(' ')) ||
              text.includes(c) ||
              this.textMatchesIntent(text, c),
          )
        : undefined;

      if (textHit) {
        return {
          intent_code: textHit,
          domain,
          confidence: 'high',
          matched_by: 'text',
          candidates: byDomain,
          known: true,
        };
      }

      return {
        intent_code: byDomain[0] ?? null,
        domain,
        confidence: byDomain.length === 1 ? 'high' : 'medium',
        matched_by: 'domain_hint',
        candidates: byDomain,
        known: Boolean(byDomain[0]),
      };
    }

    if (text) {
      const hit = known.find((c) => this.textMatchesIntent(text, c));
      if (hit) {
        return {
          intent_code: hit,
          domain: hit.split('.')[0] ?? null,
          confidence: 'medium',
          matched_by: 'text',
          candidates: known.filter((c) => this.textMatchesIntent(text, c)),
          known: true,
        };
      }
    }

    return {
      intent_code: null,
      domain: domain ?? null,
      confidence: 'none',
      matched_by: 'none',
      candidates: [...known],
      known: false,
    };
  }

  isHighRiskCommit(intentCode: string): boolean {
    return (
      intentCode === 'inventory.stock.adjust' ||
      intentCode === 'accounting.invoice.post'
    );
  }

  private textMatchesIntent(text: string, code: string): boolean {
    const parts = code.split('.');
    const phrases = [
      code,
      parts.join(' '),
      parts.slice(1).join(' '),
      parts[parts.length - 1],
    ];
    return phrases.some((p) => p && text.includes(p.replace(/_/g, ' ')));
  }
}
