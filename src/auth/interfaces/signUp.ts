import { ApiModelProperty } from '@nestjs/swagger';
import { Login } from './login';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUp extends Login {
  @IsEmail()
  @ApiModelProperty()
  email: string;

  @IsNotEmpty()
  @ApiModelProperty()
  confirmPassword: string;
}
