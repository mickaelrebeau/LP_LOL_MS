import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { PresetDataSeed } from './preset-data.seed';
import { PresetDataModule } from '../preset-data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PresetData, PresetDataSchema } from '../schemas/presetData.schema';

@Module({
  imports: [
    CommandModule,
    MongooseModule.forFeature([
      { name: PresetData.name, schema: PresetDataSchema },
    ]),
    PresetDataModule,
  ],
  providers: [PresetDataSeed],
  exports: [PresetDataSeed],
})
export class SeedsModule {}
