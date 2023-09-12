import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { FieldsEnum } from "../enums";


export type FieldsDocument = Fields & Document;


@Schema({collection: "fields", versionKey:false, timestamps:true})
export class Fields{


    @Prop({
        required: true,
        type:String,
        enum:FieldsEnum,
    })
    type: FieldsEnum;

    @Prop({
        required: true, 
    })
    label: string;


    @Prop({
        default: false,
    })
    mandatory: boolean;

    @Prop({
    })
    value: String 
    // | Number | Date;

    
}

export const FieldsSchema = SchemaFactory.createForClass(Fields);