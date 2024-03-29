import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Logger,
    UsePipes,
    UseInterceptors,
    Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserDto } from './user.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '../core/guards/role.decorator';
import { RoleGuard } from '../core/guards/role.guard';
import { LogPipe } from '../core/pipes/log.pipe';
import { PerformanceInterceptor } from '../core/interceptors/performance.interceptor';
import { ListResponse, Paging } from '../core/interfaces/paging';
import { QueryObjectPipe } from '../core/pipes/query-object.pipe';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private readonly service: UserService) {}

    // Order of controller methods matters, if 'list' will be the last, it will never be hit because rule is overwritten by :id

    @Role('admin')
    @UseGuards(RoleGuard)
    @Get('list')
    async list(
        @Query('params', new QueryObjectPipe<Paging>())
        params: Paging,
    ): Promise<ListResponse<UserDto>> {
        Logger.debug('List called');
        return await this.service.getPaged(params);
    }

    @Post()
    async create(@Body() user: User): Promise<UserDto> {
        return await this.service.create(user);
    }

    @UsePipes(new LogPipe())
    @Role('user')
    @UseGuards(RoleGuard)
    @UseInterceptors(new PerformanceInterceptor('getById'))
    @Get(':id')
    async getById(@Param() id: string): Promise<UserDto> {
        Logger.debug('getById called');
        return await this.service.getById(id);
    }

    @Put(':id')
    async update(@Param() id: string, @Body() user: User): Promise<UserDto> {
        return await this.service.update(id, user);
    }

    @Role('admin')
    @UseGuards(RoleGuard)
    @Delete(':id')
    async deleteById(@Param() id: string): Promise<void> {
        return await this.service.delete(id);
    }
}
