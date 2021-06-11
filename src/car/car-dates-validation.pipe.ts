import { Injectable, PipeTransform } from '@nestjs/common';
import { CarCreateDto } from './car.dto';

@Injectable()
export class CarDatesValidationPipe
    implements PipeTransform<CarCreateDto, CarCreateDto>
{
    transform(value: CarCreateDto): CarCreateDto {
        if (value.dateAdded >= value.dateProduced) {
            return value;
        }

        if (value.dateProduced >= new Date(2000, 1, 1)) {
            return value;
        }

        throw new Error('[Validation]: dateAdded is less than dateProduced');
    }
}
