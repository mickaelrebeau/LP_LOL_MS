import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FieldsEnum, PresetDataTypeEnum } from '../enums';

export class FieldsObject {
  @IsNotEmpty()
  @IsString()
  type: FieldsEnum;

  @IsNotEmpty()
  @IsString()
  label: String;

  @IsNotEmpty()
  @IsBoolean()
  mandatory: Boolean;
}
export class CreatePresetDateDto {
  @IsNotEmpty()
  @IsString()
  name: String;

  @IsNotEmpty()
  @IsString()
  info: String;

  @IsNotEmpty()
  @IsString()
  type: PresetDataTypeEnum;

  @Type(() => FieldsObject)
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  fields: FieldsObject[];
}
