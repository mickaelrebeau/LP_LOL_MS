import { TaskService } from './task.service';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DataAddModule } from 'src/data-add/data-add.module';
import { DatasOneUserModule } from 'src/datas-one-user/datas-one-user.module';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [
    GroupModule,
    DataAddModule,
    DatasOneUserModule
  ],
  providers: [TaskService],
})
export class TaskModule { }
