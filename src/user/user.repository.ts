import { User } from './user.interface';

export abstract class UserRepository {
  abstract async create(user: Partial<User>): Promise<User>;
  abstract async update(user: Partial<User>): Promise<void>;
  abstract async delete(id: number): Promise<void>;
  abstract async getAll(): Promise<User[]>;
  abstract async getById(id: number): Promise<User>;
  abstract async getByLogin(login: string): Promise<User | undefined>;
}
