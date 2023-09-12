import { Controller } from '@nestjs/common';
import { DatasOneUserService } from './datas-one-user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DatasOneUser } from 'src/group/schemas/datas-one-user.schema';
import { DataSharingAdditionnals } from 'src/group/schemas/data-sharing-additionnals.schema';

@Controller('datas-one-user')
export class DatasOneUserController {
    constructor(
        private readonly datasOneService: DatasOneUserService,
       
    ) {}

    @MessagePattern('CREATE_DATAS_ONE_USER')
    async createDatasOneUser(
        @Payload('body') body: any,
       // @Payload('') payload : any,
    ): Promise<any> { 
        console.log('body', body)
        // console.log('payload', payload)
        const one= await this.datasOneService.create(body);
        console.log(one)
        return {one};
    }

    @MessagePattern('DATAS_ONE_USER_BY_ID')
    async getDatasOneUserById(
        @Payload('params') params: any       
    ): Promise<DatasOneUser> { 
        console.log('params', params)
        return await this.datasOneService.getById(params.id);
    }

    @MessagePattern('UPDATE_DATAS_ONE_USER')
    async updateDatasOneUser(
        @Payload('body') body: any,
        @Payload('params') params: any,
       
    ): Promise<any> { 
        
        console.log('body', body)
        console.log(params.id)
        
        return await this.datasOneService.update(params.id,body);
        
    }

    @MessagePattern('DATAS_ONE_USER_BY_CONTACT_ID')
    async getOneByContactId(
        @Payload('params') params:any
    ): Promise<{datas:DatasOneUser[]}> {
        console.log(params);
        console.log(params.user_id);
        const datas= await this.datasOneService.getByContactId(params.user_id, params.contact_id)
        return {datas}
    }

    @MessagePattern('DATAS_ONE_USER_BY_USER_ID')
    async getOneByUsertId(
        @Payload('params') params:any
    ): Promise<{decriptedDatas: Object[]}> {
        console.log(params);
        const decriptedDatas= await this.datasOneService.getOneByUserId(params.user_id)
        console.log("hello", decriptedDatas)
        return { decriptedDatas}
    }

    @MessagePattern('DELETE_DATAS_ONE_USER')
    async deleteDatasOneUser(
        @Payload('params') params: any       
    ): Promise<void> { 
        console.log('params', params)
        return await this.datasOneService.deleteOneById(params.id);
    }

    @MessagePattern('ALL_DATAS_ONE_USER')
    async allDatasOneUser(): Promise<{datas:DatasOneUser[]}> {
        const datas= await this.datasOneService.allOneToOne();
        return {datas}
    }
}
