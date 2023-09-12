import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { CustomdataModule } from 'src/customdata/customdata.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema, Group } from './schemas/group.schema';
import { DataAddModule } from '../data-add/data-add.module';
import { DatasOneUserModule } from 'src/datas-one-user/datas-one-user.module';

@Module({
  imports:[
    CustomdataModule,
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema },
    ]),
    DataAddModule,
    DatasOneUserModule,
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [
    GroupService
  ]
})
export class GroupModule {}
