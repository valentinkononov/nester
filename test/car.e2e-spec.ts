import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../src/core/guards/role.guard';
import { UserRepository } from '../src/user/user.repository';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request, { Response } from 'supertest';
import { getQueryString } from '../src/core/utils';
import { ListResponse } from '../src/core/interfaces/paging';
import { UserDto } from '../src/user/user.interface';
import { CarDto } from '../src/car/car.dto';
import { CustomExceptionFilter } from '../src/core/filters/custom-exception.filter';

let app: INestApplication;

beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
    })
        // .overrideGuard(AuthGuard('jwt'))
        // .useClass(AuthGuardMock)
        // .overrideGuard(RoleGuard)
        // .useValue({ canActivate: () => true })
        .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new CustomExceptionFilter(app));
    await app.init();

    // repository = moduleRef.get<UserRepository>(UserRepository);
});

afterAll(async () => {
    await app.close();
});

const testCarRequest = {
    model: 'BMW',
    vin: '133TZ8',
    color: 15,
    dateProduced: '2020-06-10T09:32:13.703Z',
    dateAdded: '2021-06-10T09:32:13.703Z',
    numberPlate: 'ABC123DG',
};

describe('car lifecycle', () => {
    it('should create a new car', async () => {
        await request(app.getHttpServer())
            .post(`/car`)
            .send(testCarRequest)
            .expect(201)
            .expect((res: Response) => {
                const response: CarDto = res.body;
                expect(response.model).toBe('BMW');
                // ... other checks
            });

        await request(app.getHttpServer())
            .get('/car')
            .expect(200)
            .expect((res: Response) => {
                const response: CarDto[] = res.body;
                expect(response.length).toBe(1);
            });
    });

    it('should NOT create a new car because of incorrect dates', async () => {
        await request(app.getHttpServer())
            .post(`/car`)
            .send({
                ...testCarRequest,
                dateProduced: '2022-06-10T09:32:13.703Z',
            })
            .expect(500);
    });

    it('should NOT create a new car because of incorrect model', async () => {
        await request(app.getHttpServer())
            .post(`/car`)
            .send({
                ...testCarRequest,
                model: 'Mitsubishi',
            })
            .expect(HttpStatus.BAD_REQUEST);
    });

    it('should NOT sell a new car by incorrect number plate', async () => {
        await request(app.getHttpServer())
            .post(`/car`)
            .send({ ...testCarRequest, numberPlate: 'A1234BC' })
            .expect(HttpStatus.CREATED);

        await request(app.getHttpServer())
            .patch('/car/sell/41234BC')
            .send()
            .expect(HttpStatus.INTERNAL_SERVER_ERROR);

        await request(app.getHttpServer())
            .patch('/car/sell/A1234BC')
            .send()
            .expect(HttpStatus.CREATED);

        await request(app.getHttpServer())
            .patch('/car/sell/A1234BC')
            .send()
            .expect(HttpStatus.FORBIDDEN);
    });
});
