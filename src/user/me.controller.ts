import { Controller, Get, Put, Body, Header } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserDto } from './user.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SignedUser } from '../auth/signedUser.decorator';

@ApiBearerAuth()
@ApiTags('me')
@Controller('me')
@UseGuards(AuthGuard('jwt'))
export class MeController {
    constructor(private readonly service: UserService) {}

    @Get()
    @Header('Content-Type', 'application/json')
    @Header('Cache-Control', 'min-...=10202 .... ')
    async get(@SignedUser() signedUser: User): Promise<UserDto> {
        return await this.service.getById(signedUser.id);
    }

    @Put()
    async update(
        @SignedUser() signedUser: User,
        @Body() data: User,
    ): Promise<UserDto> {
        return await this.service.update(signedUser.id, data);
    }
}
