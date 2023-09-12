import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FieldsEnum } from '../enums';

@Schema({ id: false, _id: false, timestamps: false })
export class Field {
  @Prop({
    type: String,
    enum: FieldsEnum,
    required: true,
  })
  type: FieldsEnum;
  @Prop({
    required: true,
  })
  label: string;
  @Prop({
    required: true,
  })
  mandatory: boolean;
}
export const FieldSchema = SchemaFactory.createForClass(Field);
