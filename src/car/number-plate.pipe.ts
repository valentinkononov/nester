import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NumberPlatePipe implements PipeTransform<string, string> {
    transform(value: string): string {
        const isValid = value && value[0] >= 'A' && value[0] <= 'Z';
        if (isValid) {
            return value;
        } else {
            throw new Error('Number Plate is incorrect');
        }
    }
}
