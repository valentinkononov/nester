import {
    CanActivate,
    ExecutionContext,
    INestApplication,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request, { Response } from 'supertest';
import { User, UserDto } from '../src/user/user.interface';
import { AppModule } from '../src/app.module';
import { UserRepository } from '../src/user/user.repository';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../src/core/guards/role.guard';
import { getQueryString } from '../src/core/utils';
import { ListResponse } from '../src/core/interfaces/paging';

let app: INestApplication;
let users: User[] = [];
let repository: UserRepository;

const testUser: User = {
    id: '1',
    login: 'user',
    email: 'user@nester.com',
    role: 'user',
};

class AuthGuardMock implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        request.user = testUser;
        return true;
    }
}

beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
    })
        .overrideGuard(AuthGuard('jwt'))
        .useClass(AuthGuardMock)
        .overrideGuard(RoleGuard)
        .useValue({ canActivate: () => true })
        .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    repository = moduleRef.get<UserRepository>(UserRepository);
});

beforeEach(async () => {
    const userData: User[] = [
        {
            id: '1',
            login: 'user1',
            email: '1@n.com',
            role: 'admin',
        },
        {
            id: '2',
            login: 'user2',
            email: '2@n.com',
            role: 'user',
        },
    ];

    await repository.create(userData[0]);
    await repository.create(userData[1]);

    users = await repository.getAll();
});

afterAll(async () => {
    await app.close();
});

describe('users.findAll', () => {
    it('should return data according to page size and page number', async () => {
        await request(app.getHttpServer())
            .get(`/user/list`)
            .query(
                getQueryString({
                    params: { number: 0, size: 1 },
                }),
            )
            .expect(200)
            .expect((res: Response) => {
                const response: ListResponse<UserDto> = res.body;
                const data = response.data;

                expect(data.length).toBe(1);
                expect(response.itemsCount).toBe(2);

                expect(data[0].id).toBe(users[0].id);
            });
    });
});
