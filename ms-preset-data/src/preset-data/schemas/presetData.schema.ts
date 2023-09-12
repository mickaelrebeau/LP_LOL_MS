import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PresetDataTypeEnum } from '../enums';
import { Field, FieldSchema } from './field.schema';

export type PresetDataDocument = PresetData & Document;

@Schema({ collection: 'preset-data', versionKey: false, timestamps: true })
export class PresetData {
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
    enum: PresetDataTypeEnum,
    required: true,
  })
  type: PresetDataTypeEnum;
  @Prop({
    type: [FieldSchema],
    required: true,
  })
  fields: Field[];
}
export const PresetDataSchema = SchemaFactory.createForClass(PresetData);
