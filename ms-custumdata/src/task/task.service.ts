import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { GroupService } from 'src/group/group.service';
import { DataAddService } from 'src/data-add/data-add.service';
import { DatasOneUserService } from 'src/datas-one-user/datas-one-user.service';

@Injectable()
export class TaskService {

  constructor(
    private readonly groupService: GroupService,
    private readonly dataAddService: DataAddService,
    private readonly datasOneService: DatasOneUserService,
    ){}

  // @Cron('30 * * * * *') // ttes les 30s
  // async every30s() {
  //   console.log('30 secondes');
  // }


  // @Cron('1 * * * * *')
  // @Cron('0 */3 * * * *') //ttes les 3min
  @Cron('0 0 * * *')  //at midnight
  async expiratedGroups(): Promise<void>{
    
    const groupList = await this.groupService.allGroups();
   
    
    var d = new Date();

    for ( let group of groupList){
      console.log('group', group.id)
      //@ts-ignore // permet d'ignore une erreur de compilation qui ne devraitr pas en être une
      if (group.expiration_date < d) {
        await this.groupService.deleteOneById(group.id);
          console.log( 'groupes supprimés : ', group.id, group.name)

      }
    }
  }

  @Cron('0 0-23/12 * * *') //ttes les 12 heures
  async expiratedDataSharingAdditionnal(): Promise<void> {
    const dataAddList = await this.dataAddService.allDataSharingAdditionnals();

    var d = new Date();

    for ( let data of dataAddList){
      console.log('data', data.id)
      //@ts-ignore // permet d'ignore une erreur de compilation qui ne devraitr pas en être une
      if (data.expiration_date < d) {
        await this.dataAddService.deleteOneById(data.id);
          console.log( 'datas supprimées : ', data.id)

      }
    }
  }

  @Cron('0 0 * * *')  //at midnight
  async deleteEmptiedDatasOneUser(): Promise<void>{
    console.log("Coucou")
    const datasOneList = await this.datasOneService.allOneToOne();
    console.log(datasOneList)
    for (let element of datasOneList){
      console.log("data_sharing_additionnals",element.data_sharing_additionnals)
      if (element.data_sharing_additionnals.length === 0){
         //@ts-ignore
         console.log(element.id) 
         //@ts-ignore
         await this.datasOneService.deleteOneById(element.id);
      }   
    }
  }

  
}
