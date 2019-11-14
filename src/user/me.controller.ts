import { Controller, Get, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('me')
@Controller('me')
@UseGuards(AuthGuard('jwt'))
export class MeController {
  constructor(private readonly service: UserService) {}

  @Get()
  async get(@Req() req) {
    return await this.service.getById(req.user.id);
  }

  @Put()
  async update(@Req() req, @Body() user: User) {
    return await this.service.update(req.user.id, user);
  }
}
