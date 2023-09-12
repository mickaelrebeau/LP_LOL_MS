/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PresetDataController } from './preset-data/preset-data.controller';
import { PresetDataModule } from './preset-data/preset-data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PresetDataService } from './preset-data/preset-data.service';
import { SeedsModule } from './preset-data/seeds/seeds.module';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PresetDataModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/?retryWrites=true&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000',
      {
        dbName: 'ms-preset-data',
      },
    ),
    CommandModule,
    SeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
