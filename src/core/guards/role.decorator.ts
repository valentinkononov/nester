import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const Role = (role: string): CustomDecorator<string> =>
    SetMetadata('role', role);
