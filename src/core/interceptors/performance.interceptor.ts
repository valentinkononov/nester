import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
    private readonly requestTag: string;

    constructor(requestTag: string) {
        this.requestTag = requestTag;
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        Logger.debug('Interceptor started');
        const now = Date.now();
        // const user = context.switchToHttp().getRequest().user;

        return next.handle().pipe(
            tap(() => {
                Logger.debug('Interceptor completed');
                Logger.log(
                    `${this.requestTag} completed in: ${Date.now() - now} ms`,
                );
            }),
        );
    }
}
