import { IsString, IsEmail } from 'class-validator';

export class TokenEmailDto {
  @IsString()
  @IsEmail()
  email: String;
}
