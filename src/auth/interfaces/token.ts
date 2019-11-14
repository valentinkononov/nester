import { ApiModelProperty } from '@nestjs/swagger';

export class Token {
  @ApiModelProperty()
  token: string;
}
