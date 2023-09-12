import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RequestEnum } from '../enums/requestEnum';
import { StatusEnum } from '../enums/statusEnum';
import { Logs, LogsSchema } from './logs.shemas';
import { HydratedDocument } from 'mongoose';

export type ExchangeDocument = HydratedDocument<Exchange>;

@Schema({ collection: 'exchange', versionKey: false, timestamps: true })
export class Exchange {
  @Prop({
    required: true,
  })
  user_target_id: string;

  @Prop({
    default: true,
  })
  unseen_target: boolean;

  @Prop({
    default: false,
  })
  unseen_requester: Boolean;

  @Prop({
    required: true,
  })
  user_requester_id: string;

  @Prop({
    type: String,
    enum: RequestEnum,
    required: true,
  })
  type: RequestEnum;

  @Prop({})
  info: string;

  @Prop({
    type: String,
    enum: StatusEnum,
    required: true,
  })
  status: StatusEnum;

  @Prop({
    required: true,
    type: [LogsSchema],
  })
  logs: Logs[];
}

export const ExchangeSchema = SchemaFactory.createForClass(Exchange);
