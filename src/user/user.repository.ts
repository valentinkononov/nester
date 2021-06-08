import { User } from './user.interface';
import { ListResponse, Paging } from '../core/interfaces/paging';

export abstract class UserRepository {
    abstract create(user: Partial<User>): Promise<User>;
    abstract update(user: Partial<User>): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract getAll(): Promise<User[]>;
    abstract getPaged(paging: Paging): Promise<ListResponse<User>>;
    abstract getById(id: string): Promise<User>;
    abstract getByLogin(login: string): Promise<User | undefined>;
}
