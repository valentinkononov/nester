import { ApiModelProperty } from '@nestjs/swagger';

export class Payload {

  constructor(id: number, login: string, email: string, role: string) {
    this.id = id;
    this.login = login;
    this.email = email;
    this.role = role;
  }

  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  login: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  role: string;
}
