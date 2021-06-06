import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EveryMinuteService {
  @Cron(CronExpression.EVERY_MINUTE)
  handleEveryMinuteJob(): void {
    Logger.debug(`Cron Job was called at: ${new Date()}`);
  }
}
