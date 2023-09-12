import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
  // console.log('port', process.env.PORT);
  // console.log(`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`);
  // console.log('mongo url', process.env.MONGO_URL);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`],
      // queue: "ms-auth"
    },
  });
  app.startAllMicroservices();
}
bootstrap();
