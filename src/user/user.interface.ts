import { ApiModelProperty } from '@nestjs/swagger';
import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

/*
 * User role can be 'admin' or 'user'
 */
export type UserRole = 'admin' | 'user';

/*
 * Base User entity, stored in InMemoryDB
 */
export interface User extends InMemoryDBEntity {
  password?: string;
  salt?: string;
  login: string;
  email: string;
  role: UserRole;
}

/*
 * User class for Swagger usage - duplicates features of User interface
 * Need until new version of nest/swagger is released
 */
export class UserDto {
  id: number;

  @ApiModelProperty()
  login: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  role: UserRole;
}
