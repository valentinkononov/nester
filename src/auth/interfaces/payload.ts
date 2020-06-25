import { ApiProperty } from '@nestjs/swagger';

export class Payload {

  constructor(id: number, login: string, email: string, role: string) {
    this.id = id;
    this.login = login;
    this.email = email;
    this.role = role;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  login: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;
}
