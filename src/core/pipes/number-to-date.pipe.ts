import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NumberToDatePipe implements PipeTransform<number, Date> {
    transform(value: number): Date {
        if (value <= 0) {
            throw new Error('Number value for date should be greater than 0');
        }

        return new Date(value);
    }
}
