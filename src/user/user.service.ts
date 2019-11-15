import { HttpException, Injectable, Logger } from '@nestjs/common';
import { User, UserDto } from './user.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

  constructor(private readonly repository: UserRepository) {}

  public async create(user: Partial<User>): Promise<UserDto> {
    return this.repository.create(user)
      .then(result => this.mapUserToDto(result));
  }

  public async getById(id: number): Promise<UserDto> {
    return this.repository.getById(id)
      .then(result => this.mapUserToDto(result));
  }

  public async getAll(): Promise<UserDto[]> {
    return  this.repository.getAll()
      .then(result => result && result.length
        ? result.map(user => this.mapUserToDto(user))
        : []);
  }

  // used for internal API purposes, returns straight User object from Data Source
  public async getByLogin(login: string): Promise<User | undefined> {
    return this.repository.getByLogin(login);
  }

  public async update(id: number, user: User): Promise<UserDto> {
    user.id = id;
    return this.repository.update(user)
      .then(() => this.mapUserToDto(user));
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  private mapUserToDto(user: User): UserDto {
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
