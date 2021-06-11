import { Injectable, Logger, HttpService } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EveryMinuteService {
    constructor(private readonly httpService: HttpService) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async handleEveryMinuteJob(): Promise<void> {
        Logger.debug(`Cron Job was called at: ${new Date()}`);

        await this.httpService
            .post('tweeter/webhookurl.com', {
                tweet: { message: 'cars to sell: 10' },
            })
            .toPromise();
    }
}
