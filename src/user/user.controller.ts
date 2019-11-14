import { Controller, Get, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
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

  @Post()
  async create(@Body() user: User) {
    return await this.service.create(user);
  }

  @Get(':id')
  async getById(@Param() id: number) {
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

  @Get('list')
  async getList() {
    return await this.service.getAll();
  }

}
