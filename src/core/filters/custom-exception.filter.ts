import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    HttpException,
    HttpStatus,
    INestApplication,
    Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(HttpException)
export class CustomExceptionFilter extends BaseExceptionFilter {
    constructor(app: INestApplication) {
        super(app as any);
    }

    catch(exception: HttpException, host: ArgumentsHost): any {
        Logger.debug('Exception');
        Logger.error(exception.message, exception.stack);

        const httpArgumentsHost = host.switchToHttp();
        const request = httpArgumentsHost.getRequest<Request>();
        // const response = httpArgumentsHost.getResponse<Response>();

        Logger.error('Request URL:', request.url);
        Logger.error('Request headers:', JSON.stringify(request.headers));

        if (exception instanceof BadRequestException) {
            super.catch(
                this.convertBadRequestExceptionToHttpException(exception),
                host,
            );
        } else {
            super.catch(exception, host);
        }
    }

    private convertBadRequestExceptionToHttpException(
        exception: BadRequestException,
    ): HttpException {
        const errorMessage = {
            statusCode: exception.getStatus(),
            error: exception.name,
            message: this.handleBadRequestExceptionMessage(exception),
            originalMessage: exception.message,
        };

        return new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    private handleBadRequestExceptionMessage(
        exception: BadRequestException,
    ): string {
        let message = '';
        const response = exception.getResponse();
        if (response instanceof Object) {
            // https://docs.nestjs.com/migration-guide#validation-errors-schema
            if (Array.isArray((response as any).message)) {
                message = (response as any).message.join('; ');
            } else {
                message = (response as any).message;
            }
        } else {
            message = response;
        }
        return message;
    }
}
