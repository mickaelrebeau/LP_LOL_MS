import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //TODO: set to true for PRODUCTION
      //cache: true,
    }),
    NotificationModule,
    EmailModule,
    MongooseModule.forRoot(
      process.env.MONGO_URL,
      {
        dbName: process.env.MONGO_DB_NAME,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
