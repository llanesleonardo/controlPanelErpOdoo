import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateTaskDto, TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasks: TasksService) {}

  @Post()
  create(@Body() body: CreateTaskDto, @Req() req: Request) {
    return this.tasks.create(body ?? {}, {
      actorId: req.actorId ?? 'dev-operator',
      correlationId: req.correlationId ?? 'unknown',
    });
  }

  @Get()
  list(
    @Query('state') state?: string,
    @Query('limit') limitRaw?: string,
  ) {
    const limit = limitRaw ? Number(limitRaw) : undefined;
    return this.tasks.list({
      state,
      limit: limit && Number.isFinite(limit) ? limit : undefined,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.tasks.get(id);
  }

  @Post(':id/approve')
  approve(@Param('id') id: string, @Req() req: Request) {
    return this.tasks.approve(id, req.actorId ?? 'dev-operator');
  }

  @Post(':id/reject')
  reject(@Param('id') id: string, @Req() req: Request) {
    return this.tasks.reject(id, req.actorId ?? 'dev-operator');
  }
}
