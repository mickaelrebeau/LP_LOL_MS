import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { RequestEnum } from '../enums/requestEnum';
import { StatusEnum } from '../enums/statusEnum';
import { Type } from 'class-transformer';

export class StatusObject {
  @IsNotEmpty()
  @IsNumber()
  status: StatusEnum;
}

export class CreateExchangeDto {
  @IsNotEmpty()
  @IsString()
  user_target_id: String;

  @IsOptional()
  @IsBoolean()
  unseen_target: Boolean;

  @IsOptional()
  @IsBoolean()
  unseen_requester: Boolean;

  @IsNotEmpty()
  @IsString()
  user_requester_id: String;

  @IsNotEmpty()
  @IsNumber()
  type: RequestEnum;

  @IsOptional()
  @IsString()
  info: String;

  @IsNotEmpty()
  @IsNumber()
  status: StatusEnum;

  @Type(() => StatusObject)
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  logs: StatusObject[];
}
