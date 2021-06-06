import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class LogPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    Logger.debug('Pipe');
    // throw new HttpException('', 500);
    Logger.debug(metadata.data);
    return value;
  }
}
