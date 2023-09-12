import {
    IsString,
    IsNotEmpty,
    IsBoolean,
    ArrayMinSize,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { FieldsEnum, DataTypeEnum } from '../enums';
  
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

    @IsNotEmpty()
    @IsString()
    value: any;
  }
  export class CreateDataDto {

    @IsNotEmpty()
    @IsString()
    user: String;

    @IsNotEmpty()
    @IsString()
    name: String;
  
    @IsNotEmpty()
    @IsString()
    info: String;
  
    @IsNotEmpty()
    @IsString()
    type: DataTypeEnum;
  
    @Type(() => FieldsObject)
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    fields: FieldsObject[];
  }
  