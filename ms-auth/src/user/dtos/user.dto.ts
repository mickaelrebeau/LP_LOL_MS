/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEmail }  from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    pseudo: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    firstname: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    lastname: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string
}