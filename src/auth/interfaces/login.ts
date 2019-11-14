import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class Login {
  @IsNotEmpty()
  @ApiModelProperty()
  login: string;

  @IsNotEmpty()
  @ApiModelProperty()
  password: string;
}
