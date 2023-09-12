import { Module } from '@nestjs/common';
import { CustomdataController } from './customdata.controller';
import { CustomdataService } from './customdata.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserData, UserDataSchema } from './schemas/data.schema';

@Module({
  imports : [
    //importer tous les modeles
    MongooseModule.forFeature([
      { name: UserData.name, schema: UserDataSchema },
    ]),
  ],
  controllers: [CustomdataController],
  providers: [CustomdataService],
  exports : [CustomdataService]
})
export class CustomdataModule {}
