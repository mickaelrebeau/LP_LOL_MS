import { Module } from '@nestjs/common';
import { DataAddService } from './data-add.service';
import { DataAddController } from './data-add.controller';
import { CustomdataModule } from 'src/customdata/customdata.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSharingAdditionnals, DataSharingAdditionnalsSchema } from '../group/schemas/data-sharing-additionnals.schema';

@Module({
  imports:[
    CustomdataModule,
    MongooseModule.forFeature([
      {name: DataSharingAdditionnals.name, schema: DataSharingAdditionnalsSchema}
    ])
  ],
  providers: [DataAddService],
  controllers: [DataAddController],
  exports: [
    DataAddService
  ]
})
export class DataAddModule {}
