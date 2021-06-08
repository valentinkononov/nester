import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { CustomMiddleware } from './core/middleware/custom.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { RoutinesModule } from './routines/routines.module';

const FEATURED_MODULES = [AuthModule, UserModule, RoutinesModule];

@Module({
    imports: [ScheduleModule.forRoot(), ...FEATURED_MODULES],
    controllers: [HealthController],
    providers: [HealthService, Logger],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(CustomMiddleware).forRoutes('user');
    }
}
