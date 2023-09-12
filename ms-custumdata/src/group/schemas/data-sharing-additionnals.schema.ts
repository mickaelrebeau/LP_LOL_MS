import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserData } from 'src/customdata/schemas/data.schema';

export type DataSharingAdditionnalsDocument = HydratedDocument<DataSharingAdditionnals>;

@Schema({ timestamps:false})
export class DataSharingAdditionnals
{
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData"
    })
    data: UserData[];

    @Prop({
        required: false,
    })
    expiration_date: Date;
}

export const DataSharingAdditionnalsSchema = SchemaFactory.createForClass(DataSharingAdditionnals);