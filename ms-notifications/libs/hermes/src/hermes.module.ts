import { Module } from '@nestjs/common';
import { HermesService } from './hermes.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot(),
    ClientsModule.register([
    {     
      name:'Hermes', transport: Transport.NATS,
      options: {
        servers: [`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`],
      }
    }
    ])
  ],
  providers: [HermesService],
  exports: [HermesService],
})
export class HermesModule {}
