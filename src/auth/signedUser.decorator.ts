import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '../user/user.interface';

export const SignedUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): UserDto => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
