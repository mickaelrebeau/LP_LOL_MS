import { IsNotEmpty } from "class-validator";

export class UpdateEmailDto {
    @IsNotEmpty()
    oldEmail: string;
  
    @IsNotEmpty()
    newEmail: string;
}