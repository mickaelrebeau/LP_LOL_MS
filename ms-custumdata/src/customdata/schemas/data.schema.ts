import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Date, ObjectId, SchemaTypes, Types } from "mongoose";
import { Fields, FieldsSchema } from "src/customdata/schemas/fields.schema";
import { DataTypeEnum } from "../enums";

export type UserDataDocument = UserData & Document;


@Schema({collection: "datas", versionKey:false, timestamps:true})
export class UserData{

    
    @Prop({
        required:true,
    }) 
    user_id: string;

    @Prop({
        required: true, 
    })
    name: string;

    @Prop({
        required: true,
    })
    info: string;

    @Prop({
        type: String,
        enum: DataTypeEnum,
        required: true,
    })
    type: DataTypeEnum;

    @Prop({
        type: [FieldsSchema],
    })
    fields: Fields[];


}

export const UserDataSchema = SchemaFactory.createForClass(UserData);