import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Logger,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: HttpException, host: ArgumentsHost): void {
        Logger.debug('Exception');
        Logger.error(exception.message, exception.stack);

        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const path = httpAdapter.getRequestUrl(ctx.getRequest());

        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path,
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

        Logger.error('Request URL:', path);
        Logger.error(
            'Request headers:',
            JSON.stringify(ctx.getRequest().headers),
        );
    }
}
