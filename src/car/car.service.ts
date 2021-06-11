import { Injectable } from '@nestjs/common';
import { CarRepository } from './car.repository';
import { CarCreateDto, CarDto } from './car.dto';

@Injectable()
export class CarService {
    constructor(private readonly repository: CarRepository) {}

    async create(car: CarCreateDto): Promise<CarDto> {
        const newCar = await this.repository.create(car);
        return {
            color: newCar.color,
            model: newCar.model,
            vin: newCar.vin,
            dateProduced: newCar.dateProduced,
            dateAdded: newCar.dateAdded,
        };
    }

    async sell(numberPlate: string): Promise<boolean> {
        const cars = await this.repository.getAvailableList();
        const carToSell = cars.find((car) => car.numberPlate === numberPlate);
        if (carToSell) {
            carToSell.isSold = true;
            await this.repository.update(carToSell);
            return true;
        } else {
            return false;
        }
    }

    async getAvailableCars(): Promise<CarDto[]> {
        const cars = await this.repository.getAvailableList();
        return cars.map((car) => {
            return {
                color: car.color,
                model: car.model,
                vin: car.vin,
                dateProduced: car.dateProduced,
                dateAdded: car.dateAdded,
            };
        });
    }
}
