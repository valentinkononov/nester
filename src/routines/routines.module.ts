import { Module } from '@nestjs/common';
import { EveryMinuteService } from './everyMinute.service';

@Module({
  providers: [EveryMinuteService],
  exports: [EveryMinuteService],
})
export class RoutinesModule {}
