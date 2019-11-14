import { ApiModelProperty } from '@nestjs/swagger';

export class Email {
  @ApiModelProperty()
  email: string;
}
