import { ApiProperty } from '@nestjs/swagger';

export class Email {
  @ApiProperty()
  email: string;
}
