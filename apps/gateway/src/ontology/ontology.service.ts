import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  getEntityTypeCatalogDetail,
  listEntityTypesCatalog,
} from '@control-panel-ontology/ontology';
import { OrchestratorClient } from '../tasks/orchestrator.client';

/** Skills currently allowlisted for live execute (Epic-05). Pattern: Allowlist. */
const LIVE_READ_SKILLS = new Set(['sales.estimate.read']);

type CatalogProperty = { name: string; type?: string; description?: string };
type CatalogLink = {
  name: string;
  target: string;
  cardinality?: string;
  description?: string;
};
type CatalogAction = {
  id: string;
  label: string;
  skill: string;
  description?: string;
};
type CatalogEntity = {
  id: string;
  label: string;
  description: string;
  properties: CatalogProperty[];
  links: CatalogLink[];
  actions: CatalogAction[];
};

@Injectable()
export class OntologyService {
  constructor(private readonly orchestrator: OrchestratorClient) {}

  listCatalog() {
    return {
      entity_types: listEntityTypesCatalog(),
    };
  }

  getEntityType(id: string) {
    try {
      return getEntityTypeCatalogDetail(id);
    } catch {
      throw new NotFoundException(`Unknown entity type: ${id}`);
    }
  }

  /**
   * Object Explorer list — BFF over live skill when allowlisted, else demo rows.
   * Not a full instance Engine (Gap 01); Gap 05 first slice.
   */
  async listObjects(params: {
    entity_type: string;
    q?: string;
    limit?: number;
    actor_id: string;
    correlation_id?: string;
  }) {
    const entityType = String(params.entity_type || '').trim();
    if (!entityType) {
      throw new BadRequestException('entity_type query param required');
    }

    let catalog: CatalogEntity;
    try {
      catalog = getEntityTypeCatalogDetail(entityType) as CatalogEntity;
    } catch {
      throw new NotFoundException(`Unknown entity type: ${entityType}`);
    }

    const limit = Math.min(Math.max(Number(params.limit) || 50, 1), 100);
    const q = String(params.q || '').trim();
    const readAction = (catalog.actions || []).find(
      (a) => a.id === 'read' || String(a.skill).endsWith('.read'),
    );
    const skill = readAction?.skill;

    if (skill && LIVE_READ_SKILLS.has(skill)) {
      const result = await this.orchestrator.execute({
        intent_code: skill,
        input: {
          limit,
          active_only: true,
          ...(q ? { contains: q } : {}),
        },
        correlation_id: params.correlation_id || randomUUID(),
        actor_id: params.actor_id,
      });

      if (!result.ok) {
        return {
          entity_type: catalog.id,
          source: 'live' as const,
          skill,
          ok: false,
          message: result.message || 'Skill execute failed',
          columns: result.columns ?? [],
          objects: [] as Record<string, unknown>[],
          total_hint: 0,
          layout: this.defaultLayout(catalog),
        };
      }

      const objects = (result.rows ?? []).map((row) =>
        this.normalizeObject(catalog.id, row),
      );

      return {
        entity_type: catalog.id,
        source: 'live' as const,
        skill,
        ok: true,
        mode: result.mode,
        columns: result.columns ?? this.columnsFromObjects(objects),
        objects,
        total_hint: result.total_hint ?? objects.length,
        layout: this.defaultLayout(catalog),
        warnings: result.warnings ?? [],
      };
    }

    const demo = this.demoObjects(catalog, limit).filter((obj) => {
      if (!q) return true;
      const hay = JSON.stringify(obj).toLowerCase();
      return hay.includes(q.toLowerCase());
    });

    return {
      entity_type: catalog.id,
      source: 'demo' as const,
      skill: skill ?? null,
      ok: true,
      message: skill
        ? `Skill ${skill} is not on the live execute allowlist — showing demo objects.`
        : 'No read action on this type — showing demo objects.',
      columns: this.columnsFromCatalog(catalog),
      objects: demo,
      total_hint: demo.length,
      layout: this.defaultLayout(catalog),
    };
  }

  private defaultLayout(catalog: CatalogEntity) {
    return {
      id: `default-${catalog.id}`,
      label: `${catalog.label} properties`,
      kind: 'property_list' as const,
      property_keys: (catalog.properties || []).map((p) => p.name),
      link_keys: (catalog.links || []).map((l) => l.name),
    };
  }

  private normalizeObject(
    entityType: string,
    row: Record<string, unknown>,
  ): Record<string, unknown> {
    const id = row.id ?? row.name ?? randomUUID();
    return {
      __entity_type: entityType,
      __object_id: String(id),
      ...row,
    };
  }

  private demoObjects(catalog: CatalogEntity, limit: number) {
    const n = Math.min(limit, 5);
    const props = catalog.properties || [];
    const out: Record<string, unknown>[] = [];
    for (let i = 1; i <= n; i++) {
      const row: Record<string, unknown> = {
        __entity_type: catalog.id,
        __object_id: `DEMO-${catalog.id}-${i}`,
      };
      for (const p of props) {
        if (p.name === 'id') {
          row.id = 1000 + i;
        } else if (p.type === 'boolean') {
          row[p.name] = i % 2 === 0;
        } else if (p.type === 'integer' || p.type === 'number') {
          row[p.name] = i * 10;
        } else {
          row[p.name] = `${catalog.label} demo ${i}`;
        }
      }
      if (!row.id) row.id = `DEMO-${i}`;
      out.push(row);
    }
    return out;
  }

  private columnsFromCatalog(catalog: CatalogEntity) {
    return (catalog.properties || []).map((p) => ({
      key: p.name,
      label: p.name,
    }));
  }

  private columnsFromObjects(objects: Record<string, unknown>[]) {
    const keys = new Set<string>();
    for (const o of objects) {
      for (const k of Object.keys(o)) {
        if (!k.startsWith('__')) keys.add(k);
      }
    }
    return [...keys].map((key) => ({ key, label: key }));
  }
}
