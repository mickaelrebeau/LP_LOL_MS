import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserData, UserDataDocument } from './schemas/data.schema';


@Injectable()
export class CustomdataService {
   
    constructor(
        @InjectModel(UserData.name)
        private userDataModel: Model<UserDataDocument>
    ){}

    async create(body:any): Promise<UserData> {
        return await this.userDataModel.create(body)
    }

    async getByUserId(user_id: string): Promise<UserData[]> {
        return await this.userDataModel.find({user_id})
    }

    async update(id: string ,body:any): Promise<UserData> {
        const filter = { _id: id };
        
        return await this.userDataModel.findOneAndUpdate(filter,body)
    }

    async getById(id: string): Promise<UserData> {
        return await this.userDataModel.findById(id);
    }

    async deleteOneById(id: string): Promise<void>{
        const filter = { _id: id };
        await this.userDataModel.findOneAndRemove(filter)
    }
}

