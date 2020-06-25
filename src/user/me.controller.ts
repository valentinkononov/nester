import { Controller, Get, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';
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
  async get(@SignedUser() signedUser) {
    return await this.service.getById(signedUser.id);
  }

  @Put()
  async update(@SignedUser() signedUser, @Body() data: User) {
    return await this.service.update(signedUser.id, data);
  }
}
