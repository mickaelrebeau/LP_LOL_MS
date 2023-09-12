/* eslint-disable prettier/prettier */
import { IsString, IsOptional }  from 'class-validator'

export class UpdateUserDto {
    
    @IsOptional()
    @IsString()
    pseudo: string

    @IsOptional()
    @IsString()
    firstname: string

    @IsOptional()
    @IsString()
    lastname: string
}