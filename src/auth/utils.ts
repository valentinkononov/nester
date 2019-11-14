import { UnauthorizedException } from '@nestjs/common';

export class Utils {
  public static get UnAuthorizedException() {
    return new UnauthorizedException('Invalid username or password');
  }
}
