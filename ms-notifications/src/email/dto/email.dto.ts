import {
  IsEmail,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  IsString,
} from 'class-validator';

export class EmailDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsArray()
  @ArrayMinSize(1)
  params: { [key: string]: string };

  @IsNotEmpty()
  @IsString()
  templateId: string;
}
