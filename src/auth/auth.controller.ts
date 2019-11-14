import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './interfaces/login';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';
import { SignUp } from './interfaces/signUp';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  public async login(@Body() login: Login, @Req() req) {
    return await this.authService.signIn(req.user);
  }

  @Post('sign-up')
  async signUp(@Body() userDto: SignUp) {
    return await this.authService.signUp(userDto);
  }
}
