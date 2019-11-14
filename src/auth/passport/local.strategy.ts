import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { Utils } from '../utils';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'login',
      passwordField: 'password',
      passReqToCallback: false,
    });
  }

  async validate(login, password) {
    Logger.debug('Login ' + login);
    const user = await this.authService.logIn(login, password);
    if (!user) {
      throw Utils.UnAuthorizedException;
    }
    return user;
  }
}
