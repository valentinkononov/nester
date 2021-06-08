import { UserService } from '../src/user/user.service';
import { User } from '../src/user/user.interface';
import { UserRepository } from '../src/user/user.repository';
import { Test } from '@nestjs/testing';

const testUser: User = {
    id: '1',
    login: 'user',
    email: 'user@nester.com',
    role: 'user',
};

class UserTestRepository extends UserRepository {
    async getAll(): Promise<User[]> {
        return Promise.resolve().then(() => [testUser]);
    }

    async create(user: User): Promise<User> {
        return Promise.resolve(user);
    }

    async delete(id: string): Promise<void> {
        console.log(`Delete: ${id}`);
    }

    async getById(id: string): Promise<User> {
        console.log(`get by id: ${id}`);
        return testUser;
    }

    async getByLogin(login: string): Promise<User | undefined> {
        console.log(`get by login: ${login}`);
        return undefined;
    }

    async update(user: Partial<User>): Promise<void> {
        console.log(`update: ${user}`);
    }
}

describe('UseService', () => {
    let userService: UserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: UserRepository, useClass: UserTestRepository },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    describe('getAll', () => {
        it('should return all users in the system', async () => {
            expect(await userService.getAll()).toStrictEqual([testUser]);
        });
    });
});
