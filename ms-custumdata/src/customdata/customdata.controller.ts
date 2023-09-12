import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { CustomdataService } from './customdata.service';
import { GroupService } from 'src/group/group.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { UserData } from './schemas/data.schema';
import { CreateDataDto } from './dtos/data.dto';
import { request } from 'https';


@Controller('customdata')
export class CustomdataController {
    constructor(
        private readonly customdataService: CustomdataService,
        // private readonly groupService: GroupService,
    ) {}

    

    // @Get('/:id')
    // @ApiResponse({
    //     description: "Get all data of the user"
    // })
    // async findByUser(@Param('user_id') id: string): Promise<UserData[]> {
    //     return []
    // }

    @MessagePattern('CREATE_DATA')
    async createCustomdata(
        @Payload('body') body: any,
       
    ): Promise<any> { //DATA
        console.log('body', body)

        return await this.customdataService.create(body);
        
    }

    @MessagePattern('UPDATE_DATA')
    async updateCustomdata(
        @Payload('body') body: any,
        @Payload('params') params: any,
       
    ): Promise<any> { //DATA
        
        console.log('body', body)
        console.log(params.id)
        

        return await this.customdataService.update(params.id,body);
        
    }


    
    @MessagePattern('DATA_BY_ID')
    @ApiResponse({
        description: "Get this data of the user"
    })
    async findData(
        @Payload('params') params: any): Promise<UserData> {
            console.log("coucou")
        return await this.customdataService.getById(params.id);
    }

    @MessagePattern('DATA_BY_USER_ID')
    @ApiResponse({
        description: "Get all data of the user"
    })
    async findDataByUserId(
        @Payload('params') params: any): Promise<{users:UserData[]}> {
            console.log("coucou")
        const datas = await this.customdataService.getByUserId(params.id);
        console.log("datas", datas)
        return {users:datas}
    }

    @MessagePattern('DELETE_DATA')
    @ApiResponse({
        description: "Delete this data of the user"
    })
    async deleteData(
        @Payload('params') params: any): Promise<void> {
            console.log("bye bye")
        return await this.customdataService.deleteOneById(params.id);
    }


    
}


