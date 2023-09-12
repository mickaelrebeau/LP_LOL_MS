import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //to transform type of param automatically
      enableDebugMessages: true,
      whitelist: true,
    }),
  );

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
