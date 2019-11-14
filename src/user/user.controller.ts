import { Controller, Get, Post, Put, Delete, Body, Param, Req, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '../core/guards/role.decorator';
import { RoleGuard } from '../core/guards/role.guard';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly service: UserService) {}

  // Order of controller methods matters, if 'list' will be the last, it will never be hit because rule is overwritten by :id

  // @Role('admin')
  // @UseGuards(RoleGuard)
  @Get('list')
  async list() {
    Logger.debug('List called');
    return await this.service.getAll();
  }

  @Post()
  async create(@Body() user: User) {
    return await this.service.create(user);
  }

  @Get(':id')
  async getById(@Param() id: number) {
    Logger.debug('getById called');
    return await this.service.getById(id);
  }

  @Put(':id')
  async update(@Param() id: number, @Body() user: User) {
    return await this.service.update(id, user);
  }

  @Role('admin')
  @UseGuards(RoleGuard)
  @Delete(':id')
  async deleteById(@Param() id: number) {
    return await this.service.delete(id);
  }
}
