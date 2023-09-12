import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);
  // console.log(`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options : {
      servers: [`nats://51.83.105.174:14222`],
      // servers: [`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`],
      // queue: "ms-notifications"
    }
  })
  app.startAllMicroservices();
}
bootstrap();
