import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './interfaces/login';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { SignUp } from './interfaces/signUp';
import { SignedUser } from './signedUser.decorator';
import { User } from '../user/user.interface';
import { Token } from './interfaces/token';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    public async login(
        @Body() login: Login,
        @SignedUser() user: User,
    ): Promise<Token> {
        return await this.authService.signIn(user);
    }

    @Post('sign-up')
    async signUp(@Body() userDto: SignUp): Promise<Token> {
        return await this.authService.signUp(userDto);
    }
}
