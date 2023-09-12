import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataSharingAdditionnals, DataSharingAdditionnalsSchema } from './data-sharing-additionnals.schema';
import { HydratedDocument } from 'mongoose';


// export type GroupDocument = Group & Document;
export type DatasOneUserDocument = HydratedDocument<DatasOneUser>;  

@Schema({timestamps:false})
export class DatasOneUser{
    @Prop({
        required: true
    })
    user_id: string;

    @Prop({
        required: true
    })
    contact_id: string;

    @Prop({
    //    type: [DataSharingAdditionnalsSchema]
    })
    data_sharing_additionnals: DataSharingAdditionnals[];
}
export const DatasOneUserSchema = SchemaFactory.createForClass(DatasOneUser);