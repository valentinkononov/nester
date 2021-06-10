import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarRepository } from './car.repository';

@Module({
    imports: [UserModule, InMemoryDBModule.forRoot()],
    controllers: [CarController],
    providers: [CarService, CarRepository],
    exports: [CarService],
})
export class CarModule {}
