import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    Res,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CarCreateDto, CarDto } from './car.dto';
import { ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CarDatesValidationPipe } from './car-dates-validation.pipe';
import { NumberPlatePipe } from './number-plate.pipe';

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

    // platform dependent endpoint, will work in express only because of status setting
    @Patch('sell/:numberPlate')
    async sellCar(
        @Param('numberPlate', NumberPlatePipe) numberPlate: string,
        @Res() res: Response,
    ): Promise<void> {
        const isSellingSuccess = await this.service.sell(numberPlate);
        if (!isSellingSuccess) {
            res.status(HttpStatus.FORBIDDEN).send();
        } else {
            res.status(HttpStatus.CREATED).send();
        }
    }
}
