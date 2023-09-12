import { Module } from '@nestjs/common';
import { PresetDataService } from './preset-data.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PresetData, PresetDataSchema } from './schemas/presetData.schema';
import { PresetDataController } from './preset-data.controller';
import { HermesModule } from 'libs/hermes/src';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PresetData.name, schema: PresetDataSchema },
    ]),
    HermesModule,
  ],
  controllers: [PresetDataController],
  providers: [PresetDataService],
  exports: [PresetDataService],
})
export class PresetDataModule {}
