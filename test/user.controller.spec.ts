import { UserController } from '../src/user/user.controller';
import { UserService } from '../src/user/user.service';
import { User, UserRole } from '../src/user/user.interface';
import { UserRepository } from '../src/user/user.repository';
import { Test } from '@nestjs/testing';

const user1 = {
  id: 1,
  login: 'user',
  email: 'user@nester.com',
  role: 'user' as UserRole,
};

class UserTestRepository extends UserRepository {
  async getAll(): Promise<User[]> {
    return Promise.resolve()
      .then(() => [user1]);
  }

  async create(user: Partial<User>): Promise<User> {
    return undefined;
  }

  async delete(id: number): Promise<void> {
    return undefined;
  }

  async getById(id: number): Promise<User> {
    return undefined;
  }

  async getByLogin(login: string): Promise<User | undefined> {
    return undefined;
  }

  async update(user: Partial<User>): Promise<void> {
    return undefined;
  }
}

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: UserRepository, useClass: UserTestRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  describe('getAll', () => {
    it('should return all users in the system', async () => {
      expect(await userController.list()).toStrictEqual([user1]);
    });
  });
});
