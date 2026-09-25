import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import {
  deploymentSettingsForApi,
  loadDeploymentSettings,
} from './deployment.settings';

@Controller('config')
export class DeploymentController {
  private readonly settings = loadDeploymentSettings();

  @Get('deployment')
  @SkipThrottle()
  getDeployment() {
    return {
      service: 'gateway',
      deployment: deploymentSettingsForApi(this.settings),
    };
  }
}
