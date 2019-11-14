import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { CryptoService } from './crypto.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './passport/local.strategy';
import config from '../config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.auth.jwt.secret,
      privateKey: config.auth.jwt.secret,
      signOptions: {
        // expiresIn: 180, // config.auth.jwt.ttl,
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    UserService,
    CryptoService,
  ],
  exports: [
    PassportModule,
    AuthService,
  ],
})
export class AuthModule {}
