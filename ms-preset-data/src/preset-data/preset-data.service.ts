import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PresetData, PresetDataDocument } from './schemas/presetData.schema';
import { Model } from 'mongoose';
import { CreatePresetDateDto } from './dtos/presetData.dto';

@Injectable()
export class PresetDataService {
  constructor(
    @InjectModel(PresetData.name)
    private presetDataModel: Model<PresetDataDocument>,
  ) {}

  async create(datas: CreatePresetDateDto[]): Promise<PresetData[]> {
    const res = [];

    for (const data of datas) {
      const presetData = new this.presetDataModel(data);
      await presetData.save();
      res.push(presetData);
    }
    return res;
  }

  async getAlls(): Promise<PresetData[]> {
    return await this.presetDataModel.find();
  }
}
