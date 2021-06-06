import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { Payload } from '../interfaces/payload';
import { Utils } from '../utils';
import config from '../../config';
import { User } from '../../user/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.auth.jwt.secret,
    });
  }

  async validate(payload: Payload): Promise<User> {
    Logger.debug('Validate User');
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw Utils.UnAuthorizedException;
    }
    return user;
  }
}
