import { Injectable } from '@nestjs/common';
import config from './config';

/*
 * Health Service class, provides basic API status for testing purposes
 */
@Injectable()
export class HealthService {
    getStatus(): string {
        return `API is working fine ! Version: ${config.api.version}`;
    }
}
