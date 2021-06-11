import { IsDate, IsIn, IsNotEmpty, IsPositive, MinDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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
    @IsDate()
    @Type(() => Date)
    @MinDate(new Date(2000, 1, 1))
    dateProduced: Date;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    dateAdded: Date;
}

export class CarCreateDto extends CarDto {
    @ApiProperty()
    numberPlate: string;
}
