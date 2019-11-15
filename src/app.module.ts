import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { WinstonModule } from 'nest-winston';
import logConfig from './log-config';
import { LogPipe } from './core/pipes/log.pipe';
import { PerformanceInterceptor } from './core/interceptors/performance.interceptor';
import { CustomMiddleware } from './core/middleware/custom.middleware';

const FEATURED_MODULES = [
  AuthModule,
  UserModule,
];

@Module({
  imports: [
    WinstonModule.forRoot(logConfig.winstonOptions),
    ...FEATURED_MODULES,
    ],
  controllers: [HealthController],
  providers: [
    HealthService,
    Logger,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(CustomMiddleware)
      .forRoutes('user');
  }

}
