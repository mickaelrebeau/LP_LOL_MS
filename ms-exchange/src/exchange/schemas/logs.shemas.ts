import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StatusEnum } from '../enums/statusEnum';

@Schema({ timestamps: true, _id: false })
export class Logs {
  @Prop({
    type: String,
    enum: StatusEnum,
    required: true,
  })
  status: StatusEnum;
}

export const LogsSchema = SchemaFactory.createForClass(Logs);
