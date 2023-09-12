import { Controller, Post } from '@nestjs/common';
import { CustomdataService } from 'src/customdata/customdata.service';
import { GroupService } from './group.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Group } from './schemas/group.schema';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @MessagePattern('CREATE_GROUP')
  async createGroupByNATS(
    @Payload('body') body: any,
    // @Payload('') payload : any,
  ): Promise<any> {
    //GROUP
    console.log('body', body);
    // console.log('payload', payload)
    const group = await this.groupService.create(body);
    console.log(group);
    return { group };
  }
  @MessagePattern('GROUP_BY_ID')
  async getGroupById(@Payload('params') params: any): Promise<Object> {
    //GROUP
    console.log('params', params, 'coucou');
    const group = await this.groupService.getDecriptedGroupById(params.id);
    return { group };
  }

  @MessagePattern('GROUP_BY_USER_ID')
  async getGroupByUserId(
    @Payload('user') user: any,
  ): Promise<{ datas: Group[] }> {
    //GROUP
    console.log('params', user.id);
    const datas = await this.groupService.getByUserId(user.user);
    return { datas };
  }

  @MessagePattern('UPDATE_GROUP')
  async updateGroup(
    @Payload('body') body: any,
    @Payload('params') params: any,
  ): Promise<any> {
    console.log('body', body);
    console.log(params.id);

    return await this.groupService.update(params.id, body);
  }

  @MessagePattern('DELETE_GROUP')
  async deleteGroup(@Payload('params') params: any): Promise<void> {
    //GROUP
    console.log('params', params);
    return await this.groupService.deleteOneById(params.id);
  }

  @MessagePattern('ALL_GROUP')
  async allGroupApp(): Promise<Group[]> {
    //GROUP

    return await this.groupService.allGroups();
  }

  // @Post('')
  // async createGroupByHTTP(
  //     @Payload('body') body: any,
  //     @Payload('') payload : any,
  // ): Promise<any> { //GROUP
  //     console.log('body', body)
  //     console.log('payload', payload)
  //     return {};
  // }
}
