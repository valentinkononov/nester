import { Controller, Get, UseInterceptors, UsePipes } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiUseTags } from '@nestjs/swagger';
import { LogPipe } from './core/pipes/log.pipe';
import { PerformanceInterceptor } from './core/interceptors/performance.interceptor';

@ApiUseTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @UsePipes(new LogPipe())
  @UseInterceptors(new PerformanceInterceptor('status'))
  @Get('status')
  getHello(): string {
    return this.healthService.getStatus();
  }
}
