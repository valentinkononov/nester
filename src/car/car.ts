import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface Car extends InMemoryDBEntity {
    model: string;
    numberPlate: string;
    vin: string;
    color: number;
    dateProduced: Date;
    dateAdded: Date;
    isSold: boolean;
}
