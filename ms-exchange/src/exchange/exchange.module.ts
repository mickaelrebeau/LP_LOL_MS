import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exchange, ExchangeSchema } from './schemas/exchange.schema';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { HermesModule } from 'libs/hermes/src';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exchange.name, schema: ExchangeSchema },
    ]),
    HermesModule,
  ],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {} //
// ConfigService,
// {
//   provide: 'USER_SERVICE',
//   useFactory: (configService: ConfigService) => {
//     const userServiceOptions = configService.get('userService');
//     return ClientProxyFactory.create(userServiceOptions);
//   },
//   inject: [ConfigService],
// },
