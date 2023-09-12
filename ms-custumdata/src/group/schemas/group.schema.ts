import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose from 'mongoose';
import { UserData, UserDataSchema } from 'src/customdata/schemas/data.schema';
import { HydratedDocument } from 'mongoose';
import { DataSharingAdditionnals } from './data-sharing-additionnals.schema';

// export type GroupDocument = Group & Document;
export type GroupDocument = HydratedDocument<Group>; //permet d'utiliser group.id 

@Schema({ collection: 'group', versionKey: false, timestamps: true })
export class Group {
    @Prop({
        required: true,
      })
      user_id: string;

    @Prop({
        required: true,
    })
    name: string;

    @Prop({
        default: false,
    })
    is_default: boolean;

    @Prop({
       
    })
    expiration_date: Date;

    @Prop({
        // type:[UserDataSchema],
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'UserData',
        required:false,
    })
    // data_sharing:[UserData];
    // data_sharing: String[];
    data_sharing: DataSharingAdditionnals[];

    @Prop({
        // type: [GroupUsersSchema],
    })
    // group_users: GroupUsers[];
    group_users: String[];
}
export const GroupSchema = SchemaFactory.createForClass(Group);
