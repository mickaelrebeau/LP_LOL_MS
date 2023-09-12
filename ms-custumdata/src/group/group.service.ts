import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomdataService } from 'src/customdata/customdata.service';
import { Group, GroupDocument } from './schemas/group.schema';
import { Model } from 'mongoose';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { DataAddService } from 'src/data-add/data-add.service';


@Injectable()
export class GroupService {
    constructor(
        @InjectModel(Group.name)
        private groupModel: Model<GroupDocument>,
        private readonly customdataService: CustomdataService,
        private readonly dataAddService : DataAddService
        ){}

        async create(body: any): Promise<Group> {
            return await this.groupModel.create(body);
        }

        async getByUserId(user_id: string): Promise<Group[]> {
            const groups = await this.groupModel.find({user_id});
            console.log(groups)
            return groups
        }

        async update(id: string ,body:any): Promise<Group> {
            const filter = { _id: id };
            
            return await this.groupModel.findOneAndUpdate(filter,body)
        }

        async getById(id: string): Promise<Group> {
            return await this.groupModel.findById(id);
        }

        async getDecriptedGroupById(id:string): Promise<Object>{
            let group = await this.getById(id);
            return this.decriptedGroupById(group)
        }
    
        async deleteOneById(id: string): Promise<void>{
            const filter = { _id: id };
            await this.groupModel.findOneAndRemove(filter)
        }

        async allGroups(): Promise<GroupDocument[]>{
            return this.groupModel.find();
        }

        async decriptedGroupById(group:Group): Promise<Object> {
            let datas = group.data_sharing;
            let expiration_group = group.expiration_date;

            let name = group.name;
            let is_default = group.is_default;
            let group_users = group.group_users;
            let dataname = [];
            let expiration: Date;
            let decriptedDatas = [];
            console.log("datas", datas)
            for (const item of datas){
                console.log("item",item)
                const item2 = await this.dataAddService.getById((item).toString())
                console.log("item2",item2, item2.data,(item2.data).toString())
                const item3 = await this.customdataService.getById((item2.data).toString())
                console.log("item2", item2, "dataname", item3.name)
                dataname.push(item3.name) 
                expiration = item2.expiration_date
                console.log("expiration", expiration)
                const one_data_sharing = {"dataname":dataname, "expiration":expiration}
                decriptedDatas.push(one_data_sharing)
            }
            const decriptedGroup = {"name":name, "is_default":is_default, "decriptedDatas": decriptedDatas,"group_users":group_users, "expiration_group":expiration_group}
            console.log(decriptedGroup)
            return decriptedGroup;
        }

        
}
