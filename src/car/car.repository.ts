import { Injectable } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Car } from './car';

@Injectable()
export class CarRepository {
    constructor(private readonly service: InMemoryDBService<Car>) {}

    async create(car: Partial<Car>): Promise<Car> {
        return this.service.createAsync(car).toPromise();
    }

    async update(car: Car): Promise<void> {
        return this.service.updateAsync(car).toPromise();
    }

    async markAsSold(id: string): Promise<Car> {
        const current = await this.service.get(id);
        if (current) {
            current.isSold = true;
            await this.service.update(current);
        }
        return current;
    }

    async getAvailableList(): Promise<Car[]> {
        const cars = await this.service.getAllAsync().toPromise();
        return cars.filter((car) => !car.isSold);
    }
}
