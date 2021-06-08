import { ApiProperty } from '@nestjs/swagger';

export class Payload {
    constructor(id: string, login: string, email: string, role: string) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.role = role;
    }

    @ApiProperty()
    id: string;

    @ApiProperty()
    login: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: string;
}
