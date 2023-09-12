import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
  console.log(`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`],
    },
  });
  app.startAllMicroservices();
}
bootstrap();
