import { Controller, Get } from '@nestjs/common';
import { DataAddService } from './data-add.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DataSharingAdditionnals } from '../group/schemas/data-sharing-additionnals.schema';

@Controller('data-add')
export class DataAddController {
    constructor(
        private readonly dataAddService: DataAddService,
    ){}

    @MessagePattern('CREATE_DATA_SHARING_ADDITIONNAL')
    async createDataAdd(
        @Payload('body') body: any,
    ): Promise<any> {
        return await this.dataAddService.create(body);
    }

    @MessagePattern('UPDATE_DATA_SHARING_ADDITIONNAL')
    async updateDataAdd(
        @Payload('body') body: any,
        @Payload('params') params: any,
    ): Promise<any> { 
        return await this.dataAddService.update(params.id,body);
        
    }

    @MessagePattern('DATA_SHARING_ADDITIONNAL_BY_ID')
    async getDataAdd(
        @Payload('params') params: any
    ): Promise<DataSharingAdditionnals> {
        console.log('params', params, "je suis là")
        return await this.dataAddService.getById(params.id);
    }

    @MessagePattern('DELETE_DATA_SHARING_ADDITIONNAL')
    async deleteDataAdd(
        @Payload('params') params: any,
    ): Promise<void> {
        console.log('data', params.id)
        return await this.dataAddService.deleteOneById(params.id);
    }

    @MessagePattern('ALL_DATA_SHARING_ADDITIONNALS')
    async allGroupApp(): Promise<DataSharingAdditionnals[]> { 
    
        return await this.dataAddService.allDataSharingAdditionnals();
    }    

  
}
