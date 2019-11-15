import { ArgumentMetadata, HttpException, Injectable, Logger, PipeTransform } from '@nestjs/common';

@Injectable()
export class LogPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    Logger.debug('Pipe');
    // throw new HttpException('', 500);
    return value;
  }

}
