import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Payload } from './interfaces/payload';
import { User, UserDto, UserRole } from '../user/user.interface';
import { CryptoService } from './crypto.service';
import { SignUp } from './interfaces/signUp';
import { Token } from './interfaces/token';
import { Utils } from './utils';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly cryptoService: CryptoService,
        private readonly jwtService: JwtService,
    ) {}

    private getTokenPayload(user: User | UserDto): Payload {
        return new Payload(user.id, user.login, user.email, user.role);
    }

    public async signUp(userDto: SignUp): Promise<Token> {
        return await this.userService
            .getByLogin(userDto.login)
            .then((existingUser) => {
                if (existingUser && existingUser.id) {
                    throw new Error('User with this email already exists');
                }
                const password = this.cryptoService.hashPassword(
                    userDto.password,
                );
                const user: User = {
                    id: undefined,
                    email: userDto.email,
                    login: userDto.login,
                    password: password.hash,
                    salt: password.salt,
                    role: 'user',
                };

                return this.userService.create(user).then((newUser) => {
                    const token = this.jwtService.sign(
                        JSON.stringify(this.getTokenPayload(newUser)),
                    );
                    return { token };
                });
            });
    }

    public async signIn(user: User): Promise<Token> {
        const token = this.jwtService.sign(
            JSON.stringify(this.getTokenPayload(user)),
        );
        return { token };
    }

    async validateUser(payload: Payload): Promise<User> {
        return await this.userService.getByLogin(payload.login);
    }

    // used in local auth strategy
    public async logIn(login: string, password: string): Promise<User> {
        Logger.debug('login');
        const user = await this.userService.getByLogin(login);

        Logger.debug(user);
        if (user && user.id) {
            if (
                this.cryptoService.checkPassword(
                    user.password,
                    user.salt,
                    password,
                )
            ) {
                return user;
            } else {
                throw Utils.UnAuthorizedException;
            }
        } else {
            throw Utils.UnAuthorizedException;
        }
    }
}
