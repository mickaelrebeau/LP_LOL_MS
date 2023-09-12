import { Module } from '@nestjs/common';
import { DatasOneUserService } from './datas-one-user.service';
import { DatasOneUserController } from './datas-one-user.controller';
import { DataAddModule } from 'src/data-add/data-add.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from 'src/group/schemas/group.schema';
import { CustomdataModule } from 'src/customdata/customdata.module';
import { DatasOneUser, DatasOneUserSchema } from 'src/group/schemas/datas-one-user.schema';

@Module({
  imports:[
    CustomdataModule,
    MongooseModule.forFeature([
      { name: DatasOneUser.name, schema: DatasOneUserSchema },
    ]),
    DataAddModule,
  ],
  providers: [DatasOneUserService],
  controllers: [DatasOneUserController],
  exports: [
    DatasOneUserService
  ]
})
export class DatasOneUserModule {}
