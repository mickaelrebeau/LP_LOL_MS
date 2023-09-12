import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token.schema';
import { TokenController } from './token.controller';
import { HermesModule } from 'libs/hermes/src';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    HermesModule,
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
