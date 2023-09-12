import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      whitelist: true,
    }),
  );
  console.log('test', uuidv4());
  console.log('port', process.env.PORT);
  console.log(`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`],
    },
  });

  app.startAllMicroservices();

  await app.listen(process.env.PORT);
}
bootstrap();
