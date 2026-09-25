import { Module } from '@nestjs/common';
import { DeploymentController } from './deployment.controller';

@Module({
  controllers: [DeploymentController],
})
export class DeploymentModule {}
