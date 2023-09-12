import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { typeEnum } from '../enums/typeEnum';

export class CreateTokenVerifEmailDto {
  @IsNotEmpty()
  @IsString()
  user_id: String;

  @IsNotEmpty()
  @IsNumber()
  type: typeEnum;

  @IsNotEmpty()
  @IsString()
  token: String;
}
