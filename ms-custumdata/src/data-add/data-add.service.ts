import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataSharingAdditionnals, DataSharingAdditionnalsDocument } from '../group/schemas/data-sharing-additionnals.schema';
import { Model } from 'mongoose';

@Injectable()
export class DataAddService {
    constructor(
        @InjectModel(DataSharingAdditionnals.name)
        private dataAddModel: Model<DataSharingAdditionnalsDocument>
    ){}

    async create(body:any): Promise<DataSharingAdditionnals> {
        return await this.dataAddModel.create(body);
    }

    async update(id: string ,body:any): Promise<DataSharingAdditionnals> {
        const filter = { _id: id };
        return await this.dataAddModel.findOneAndUpdate(filter,body)
    }

    async getById(id: string): Promise<DataSharingAdditionnals> {
        return await this.dataAddModel.findById(id);
    }

    async deleteOneById(id: string): Promise<void>{
        const filter = { _id: id };
        await this.dataAddModel.findOneAndRemove(filter)
    }

    async allDataSharingAdditionnals(): Promise<DataSharingAdditionnalsDocument[]>{
        return this.dataAddModel.find();
    }
}
