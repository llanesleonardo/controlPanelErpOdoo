import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ExecutionMode, Prisma, TaskState } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { IntentsService } from '../intents/intents.service';
import { StructuredLogger } from '../common/logging/structured-logger.service';
import { StorageService } from '../common/storage/storage.service';
import { OrchestratorClient } from './orchestrator.client';

export interface CreateTaskDto {
  intent_code?: string;
  domain?: string;
  text?: string;
  execution_mode?: 'dry_run' | 'commit';
  input?: Record<string, unknown>;
  skill_id?: string;
}

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly intents: IntentsService,
    private readonly logger: StructuredLogger,
    private readonly storage: StorageService,
    private readonly orchestrator: OrchestratorClient,
  ) {}

  async create(
    dto: CreateTaskDto,
    meta: { actorId: string; correlationId: string },
  ) {
    const classified = this.intents.classify({
      intent_code: dto.intent_code,
      domain: dto.domain,
      text: dto.text,
      structured: dto.input,
    });

    if (!classified.intent_code) {
      throw new BadRequestException(
        'Could not classify intent. Provide intent_code, domain, or text.',
      );
    }

    const executionMode =
      dto.execution_mode === 'commit'
        ? ExecutionMode.commit
        : ExecutionMode.dry_run;

    let state: TaskState = TaskState.pending;
    if (
      executionMode === ExecutionMode.commit &&
      this.intents.isHighRiskCommit(classified.intent_code)
    ) {
      state = TaskState.needs_approval;
    }

    const input = (dto.input ?? {
      domain: dto.domain,
      text: dto.text,
    }) as Record<string, unknown>;

    let task = await this.prisma.task.create({
      data: {
        correlationId: meta.correlationId,
        actorId: meta.actorId,
        intentCode: classified.intent_code,
        skillId: dto.skill_id ?? null,
        state,
        executionMode,
        input: input as Prisma.InputJsonValue,
      },
    });

    this.logger.log(
      `task created ${task.id} state=${task.state} intent=${task.intentCode}`,
      'TasksService',
    );

    if (executionMode === ExecutionMode.dry_run) {
      task = await this.runDryRun(task.id, meta);
    }

    return this.toDto(task);
  }

  private async runDryRun(
    id: string,
    meta: { actorId: string; correlationId: string },
  ) {
    const current = await this.prisma.task.findUnique({ where: { id } });
    if (!current) throw new NotFoundException(`Task ${id} not found`);

    await this.prisma.task.update({
      where: { id },
      data: { state: TaskState.running },
    });

    try {
      const result = await this.orchestrator.dryRun({
        intent_code: current.intentCode,
        input: (current.input as Record<string, unknown>) ?? {},
        correlation_id: meta.correlationId,
        actor_id: meta.actorId,
      });

      if (!result.ok) {
        const error = {
          error_class: result.error_class ?? 'dependency_failure',
          message: result.message ?? 'Dry-run failed',
          detail: result.detail ?? null,
        };
        try {
          this.storage.writeEvidenceJson(
            meta.correlationId,
            'dry-run-error.json',
            error,
          );
        } catch {
          // inline error still stored on task
        }
        return this.prisma.task.update({
          where: { id },
          data: {
            state: TaskState.failed,
            error: error as Prisma.InputJsonValue,
          },
        });
      }

      const output = {
        predicted_effects: result.predicted_effects ?? [],
        warnings: result.warnings ?? [],
        mode: result.mode ?? 'dry_run',
        skill_id: result.skill_id,
        adapter: result.adapter ?? null,
        evidence_path: result.evidence_path ?? null,
      };

      try {
        this.storage.writeEvidenceJson(
          meta.correlationId,
          'dry-run-output.json',
          output,
        );
      } catch {
        // orchestrator may already have written evidence
      }

      return this.prisma.task.update({
        where: { id },
        data: {
          state: TaskState.completed,
          skillId: result.skill_id ?? current.skillId,
          output: output as Prisma.InputJsonValue,
          error: Prisma.DbNull,
        },
      });
    } catch (err) {
      const error = {
        error_class: 'dependency_failure',
        message:
          err instanceof Error ? err.message : 'Orchestrator call failed',
      };
      this.logger.error(
        `dry-run failed for ${id}: ${error.message}`,
        'TasksService',
      );
      return this.prisma.task.update({
        where: { id },
        data: {
          state: TaskState.failed,
          error: error as Prisma.InputJsonValue,
        },
      });
    }
  }

  async list(params?: { state?: string; limit?: number }) {
    const limit = Math.min(params?.limit ?? 50, 200);
    const where: Prisma.TaskWhereInput = {};
    if (params?.state) {
      if (!(params.state in TaskState)) {
        throw new BadRequestException(`Unknown state: ${params.state}`);
      }
      where.state = params.state as TaskState;
    }
    const items = await this.prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return { items: items.map((t) => this.toDto(t)) };
  }

  async get(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return this.toDto(task);
  }

  async approve(id: string, actorId: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    if (task.state !== TaskState.needs_approval) {
      throw new BadRequestException(
        `Task ${id} is ${task.state}, expected needs_approval`,
      );
    }

    // Commit path still stubbed — no ERP mutation in Epic-04
    const updated = await this.prisma.task.update({
      where: { id },
      data: {
        state: TaskState.completed,
        approvedBy: actorId,
        approvedAt: new Date(),
        output: {
          evidence: { commit_deferred: true },
          note: 'Approved; ERP commit not implemented in Epic-04.',
        },
      },
    });

    this.logger.log(`task approved ${id} by ${actorId}`, 'TasksService');
    return this.toDto(updated);
  }

  async reject(id: string, actorId: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    if (task.state !== TaskState.needs_approval) {
      throw new BadRequestException(
        `Task ${id} is ${task.state}, expected needs_approval`,
      );
    }

    const updated = await this.prisma.task.update({
      where: { id },
      data: {
        state: TaskState.rejected,
        approvedBy: actorId,
        approvedAt: new Date(),
        output: {
          rejected_by: actorId,
          note: 'Rejected by operator (dev-actor stub).',
        },
      },
    });

    this.logger.log(`task rejected ${id} by ${actorId}`, 'TasksService');
    return this.toDto(updated);
  }

  private toDto(task: {
    id: string;
    correlationId: string;
    actorId: string;
    intentCode: string;
    skillId: string | null;
    state: TaskState;
    executionMode: ExecutionMode;
    input: unknown;
    output: unknown;
    error: unknown;
    approvedBy: string | null;
    approvedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: task.id,
      correlation_id: task.correlationId,
      actor_id: task.actorId,
      intent_code: task.intentCode,
      skill_id: task.skillId,
      state: task.state,
      execution_mode: task.executionMode,
      input: task.input,
      output: task.output,
      error: task.error,
      approved_by: task.approvedBy,
      approved_at: task.approvedAt,
      created_at: task.createdAt,
      updated_at: task.updatedAt,
    };
  }
}
