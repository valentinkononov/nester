import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    Logger.debug('Exception');
    Logger.error(exception.message, exception.stack);

    const httpArgumentsHost = host.switchToHttp();
    const request = httpArgumentsHost.getRequest<Request>();
    // const response = httpArgumentsHost.getResponse<Response>();

    Logger.error('Request URL:', request.url);
    Logger.error('Request headers:', JSON.stringify(request.headers));
  }
}
