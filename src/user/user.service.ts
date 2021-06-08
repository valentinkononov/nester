import { HttpException, Injectable } from '@nestjs/common';
import { User, UserDto } from './user.interface';
import { UserRepository } from './user.repository';
import { ListResponse, Paging } from '../core/interfaces/paging';

@Injectable()
export class UserService {
    constructor(private readonly repository: UserRepository) {}

    public async create(user: Partial<User>): Promise<UserDto> {
        return this.repository
            .create(user)
            .then((result) => UserService.mapUserToDto(result));
    }

    public async getById(id: string): Promise<UserDto> {
        return this.repository
            .getById(id)
            .then((result) => UserService.mapUserToDto(result));
    }

    public async getAll(): Promise<UserDto[]> {
        return this.repository
            .getAll()
            .then((result) =>
                result && result.length
                    ? result.map((user) => UserService.mapUserToDto(user))
                    : [],
            );
    }

    public async getPaged(paging: Paging): Promise<ListResponse<UserDto>> {
        return this.repository.getPaged(paging).then((result) => {
            return {
                data: result.data.map((user) => UserService.mapUserToDto(user)),
                itemsCount: result.itemsCount,
            };
        });
    }

    // used for internal API purposes, returns straight User object from Data Source
    public async getByLogin(login: string): Promise<User | undefined> {
        return this.repository.getByLogin(login);
    }

    public async update(id: string, user: User): Promise<UserDto> {
        user.id = id;
        return this.repository
            .update(user)
            .then(() => UserService.mapUserToDto(user));
    }

    public async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    private static mapUserToDto(user: User): UserDto {
        if (!user) {
            throw new HttpException('User not created', 500);
        }
        return {
            id: user.id,
            login: user.login,
            email: user.email,
            role: user.role,
        };
    }
}
