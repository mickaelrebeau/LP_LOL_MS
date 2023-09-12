import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataAddService } from 'src/data-add/data-add.service';
import { CustomdataService } from 'src/customdata/customdata.service';
import { DataSharingAdditionnals, DataSharingAdditionnalsDocument } from 'src/group/schemas/data-sharing-additionnals.schema';
import { DatasOneUser, DatasOneUserDocument } from 'src/group/schemas/datas-one-user.schema';

@Injectable()
export class DatasOneUserService {
   
    constructor(
        @InjectModel(DatasOneUser.name)
        private datasOneUserModel: Model<DatasOneUserDocument>,
        private readonly dataAddService: DataAddService,
        private readonly customdataService: CustomdataService,
    ){}

    async create(body: any): Promise<DatasOneUser> {
        // body.data = DataAddService.create(body);
        return await this.datasOneUserModel.create(body);
    }

    async getById(id: string): Promise<DatasOneUser> {
        return await this.datasOneUserModel.findById(id);
    }

    async getByContactId(user_id: string, contact_id: string): Promise<DatasOneUser[]>{
        return await this.datasOneUserModel.find({user_id: user_id, contact_id: contact_id})
    }

    async getByUserId(user_id: string): Promise<DatasOneUser[]>{
        return await this.datasOneUserModel.find({user_id: user_id})
    }

    async getOneByUserId(user_id: string): Promise<Object[]>{
        let datas = await this.getByUserId(user_id);
        return this.recoveryDataAdd(datas)
    }

    async update(id: string,body:any): Promise<DatasOneUser> {
        const filter = {_id: id};
        return await this.datasOneUserModel.findByIdAndUpdate(filter,body)
    }

    async deleteOneById(id: string): Promise<void>{
        const filter = {_id: id}
        await this.datasOneUserModel.findByIdAndRemove(filter)
    }

    async allOneToOne(): Promise<DatasOneUser[]>{
        return this.datasOneUserModel.find();
    }

    async recoveryDataAdd(DatasOneUser: DatasOneUser[]): Promise<Object[]>{
        let dataAddForOne = [];
        for(const item of DatasOneUser) {
            let datas = item.data_sharing_additionnals;
            let dataname = [];
            let expiration;
            // console.log("datas", datas)
            for(const item2 of datas) {
               
               
                const item4 = await this.customdataService.getById((item2.data).toString())
                
                dataname.push(item4.name) 
                expiration = item2.expiration_date
               
                // return (dataname, expiration)
            };

            const dataAddForOneX = {"contact_id": item.contact_id, "dataname": dataname, "expiration": expiration}
            console.log("dataAddForOneX",dataAddForOneX)
            dataAddForOne.push(dataAddForOneX)
        };
        console.log("dataAddForOne2",dataAddForOne)
        return dataAddForOne
    }
}
