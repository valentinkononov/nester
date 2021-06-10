import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { CarCreateDto, CarDto } from './car.dto';
import { ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CarDatesValidationPipe } from './car-dates-validation.pipe';

@ApiTags('car')
@Controller('car')
export class CarController {
    constructor(private readonly service: CarService) {}

    @Get()
    async getAvailableCars(): Promise<CarDto[]> {
        return await this.service.getAvailableCars();
    }

    // @Get(':numberPlate')
    // async getByNumberPlate(
    //     @Param('numberPlate')
    //     numberPlate: string,
    // ): Promise<CarDto> {
    //
    // }

    @Post()
    @UsePipes(CarDatesValidationPipe)
    async addNewCar(@Body() car: CarCreateDto): Promise<CarDto> {
        return await this.service.create(car);
    }
}
