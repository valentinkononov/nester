import { ApiProperty } from '@nestjs/swagger';
import { Login } from './login';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUp extends Login {
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    confirmPassword: string;
}
