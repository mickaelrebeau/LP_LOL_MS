import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { typeEnum } from '../enums/typeEnum';

export type TokenDocument = Token & Document;

@Schema({ collection: 'token', versionKey: false, timestamps: true })
export class Token {
  @Prop({
    required: true,
  })
  user_id: string;

  @Prop({
    type: Number,
    enum: typeEnum,
    required: true,
  })
  type: typeEnum;
  @Prop({
    required: true,
  })
  token: string;
  @Prop({})
  otp_code: number;
  @Prop({
    default: 0,
  })
  nbTry: number;
}
export const TokenSchema = SchemaFactory.createForClass(Token);
