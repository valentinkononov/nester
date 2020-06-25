import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EveryMinuteService {
  @Cron(CronExpression.EVERY_5_SECONDS)
  handleEveryMinuteJob() {
    Logger.debug(`I was called at: ${new Date()}`);
  }
}
