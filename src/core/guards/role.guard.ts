import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserDto, UserRole } from '../../user/user.interface';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        Logger.debug('Guard');
        return true;
        const roles: UserRole[] = this.reflector.get<UserRole[]>(
            'role',
            context.getHandler(),
        );
        if (!roles || roles.length === 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: UserDto = request.user;
        return roles.some((r) => r === user.role);
    }
}
