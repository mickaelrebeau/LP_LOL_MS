import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomdataModule } from './customdata/customdata.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupModule } from './group/group.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';
import { DatasOneUserModule } from './datas-one-user/datas-one-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomdataModule,
    GroupModule,
    MongooseModule.forRoot(
      'mongodb+srv://johndrone2:Vc3qZ1VfBG02GXl9@lp-lol.imjwyuj.mongodb.net/admin?retryWrites=true&replicaSet=atlas-141jab-shard-0&readPreference=primary&srvServiceName=mongodb&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1',
      {
        dbName: 'lp_lol_ms_custumdata',
      },
    ),
    ScheduleModule.forRoot(),
    TaskModule,
    DatasOneUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
