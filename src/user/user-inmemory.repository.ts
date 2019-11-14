import { Injectable, Logger, Scope } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.interface';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';

@Injectable({
  scope: Scope.DEFAULT,
})
export class UserInMemoryRepository extends UserRepository {
  constructor(private readonly service: InMemoryDBService<User>) {
    super();
    Logger.debug('UserInMemoryRepository initialized');
  }

  async create(user: Partial<User>): Promise<User> {
    return this.service.createAsync(user).toPromise()
      .then(user => {
        Logger.debug('user created');
        const users = this.service.getAll();
        Logger.debug(users);
        return user;
      });
  }

  async delete(id: number): Promise<void> {
    await this.service.deleteAsync(id);
  }

  async getAll(): Promise<User[]> {
    return this.service.getAllAsync().toPromise();
  }

  async getByLogin(login: string): Promise<User | undefined> {
    return this.service.queryAsync(
      x => x.login.toLocaleLowerCase() === login.toLocaleLowerCase())
      .toPromise()
      .then(result => result && result.length ? result[0] : undefined);
  }

  async getById(id: number): Promise<User> {
    return this.service.getAsync(id).toPromise();
  }

  async update(user: User): Promise<void> {
    return this.service.updateAsync(user).toPromise();
  }
}
