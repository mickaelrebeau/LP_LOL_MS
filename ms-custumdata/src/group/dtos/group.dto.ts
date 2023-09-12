import {
    IsString,
    IsNotEmpty,
    IsBoolean,
    ArrayMinSize,
    ValidateNested,
    IsDate,
  } from 'class-validator';
  import { Type } from 'class-transformer';
import { UserData } from 'src/customdata/schemas/data.schema';
import { DatasOneUser } from '../schemas/datas-one-user.schema';

  
  export class DataSharingAddittionnalsObject {
    @IsString()
    type: UserData;
  
    @IsString()
    expiration_date: Date;
  
  }

  export class UsersObject {

    @IsString()
    user_id:String;

    @Type(() => DataSharingAddittionnalsObject)
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    fields: DataSharingAddittionnalsObject[];
  }

  export class CreateGroupDto {

    @IsNotEmpty()
    @IsString()
    user_id: String;

    @IsNotEmpty()
    @IsString()
    name: String;
  
   
    @IsString()
    is_default: Boolean;
  
    @IsDate()
    expiration_date: Date;
  
    @Type(() => DataSharingAddittionnalsObject)
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    data_sharing: DataSharingAddittionnalsObject[];

    @Type(() => String)
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    group_users: String[];
  }
  