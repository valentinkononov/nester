import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Login {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    login: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;
}
