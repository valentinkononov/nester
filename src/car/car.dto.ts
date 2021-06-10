import {
    IsDateString,
    IsIn,
    IsNotEmpty,
    IsPositive,
    MinDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CarDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsIn(['BMW', 'Porsche', 'Skoda'])
    model: string;

    @ApiProperty()
    @IsNotEmpty()
    vin: string;

    @ApiProperty()
    @IsPositive()
    color: number;

    // @ValidateIf(o => o.otherProperty === 'value')
    @ApiProperty()
    @IsDateString()
    @MinDate(new Date(2000, 1, 1))
    dateProduced: Date;

    @ApiProperty()
    @IsDateString()
    dateAdded: Date;
}

export class CarCreateDto extends CarDto {
    @ApiProperty()
    numberPlate: string;
}
