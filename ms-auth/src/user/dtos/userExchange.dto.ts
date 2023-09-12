// pour populate de ms-exchange pas toucher!!!!

import { IsEmail, IsString } from 'class-validator';

export class userExchangeDto {
  @IsString()
  pseudo: String;

  @IsString()
  password: String;

  @IsString()
  firstname: String;

  @IsString()
  lastname: String;

  @IsEmail()
  @IsString()
  email: String;
}
