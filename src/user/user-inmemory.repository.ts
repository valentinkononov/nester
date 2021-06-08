import { Injectable, Logger, Scope } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.interface';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ListResponse, Paging } from '../core/interfaces/paging';

@Injectable({
    scope: Scope.DEFAULT,
})
export class UserInMemoryRepository extends UserRepository {
    constructor(private readonly service: InMemoryDBService<User>) {
        super();
        Logger.debug('UserInMemoryRepository initialized');
    }

    async create(user: Partial<User>): Promise<User> {
        return this.service
            .createAsync(user)
            .toPromise()
            .then((user) => {
                Logger.debug('user created');
                return user;
            });
    }

    async delete(id: string): Promise<void> {
        await this.service.deleteAsync(id);
    }

    async getAll(): Promise<User[]> {
        return this.service.getAllAsync().toPromise();
    }

    async getPaged(paging: Paging): Promise<ListResponse<User>> {
        const startIndex = paging.number * paging.size;
        const allItems = await this.service.getAllAsync().toPromise();
        const itemsCount = allItems.length;
        return {
            data: allItems.slice(startIndex, startIndex + paging.size),
            itemsCount,
        };
    }

    async getByLogin(login: string): Promise<User | undefined> {
        return this.service
            .queryAsync(
                (x) =>
                    x.login.toLocaleLowerCase() === login.toLocaleLowerCase(),
            )
            .toPromise()
            .then((result) =>
                result && result.length ? result[0] : undefined,
            );
    }

    async getById(id: string): Promise<User> {
        return this.service.getAsync(id).toPromise();
    }

    async update(user: User): Promise<void> {
        return this.service.updateAsync(user).toPromise();
    }
}
