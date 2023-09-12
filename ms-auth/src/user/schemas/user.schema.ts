/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({collection: "user", versionKey: false, timestamps: true})
export class User{
    @Prop({
        required: true,
    })
    pseudo: string;

    @Prop({
        required: true,
    })
    firstname: string;

    @Prop({
        required: true,
    })
    lastname: string;

    @Prop({
        required: true,
        unique: true,
    })
    email: string;

    @Prop({
        required: true,
    })
    password: string;

    @Prop({
        default: false,
    })
    status: boolean;

    @Prop({
        default: [],
    })
    group_ids: string[];

    @Prop({
        default: [],
    })
    datas: string[];
}

export const UserSchema = SchemaFactory.createForClass(User)