import { Controller, Get, UseInterceptors, UsePipes } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiTags } from '@nestjs/swagger';
import { LogPipe } from './core/pipes/log.pipe';
import { PerformanceInterceptor } from './core/interceptors/performance.interceptor';

@ApiTags('health')
@Controller('')
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @UseInterceptors(new PerformanceInterceptor('status'))
    @UsePipes(new LogPipe())
    @Get('')
    getHello(): string {
        return this.healthService.getStatus();
    }
}
