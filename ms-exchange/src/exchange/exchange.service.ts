import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exchange, ExchangeDocument } from './schemas/exchange.schema';
import { Model } from 'mongoose';
import { CreateExchangeDto } from './dtos/exchange.dto';
// import { CreateExchangeDataDto } from './dtos/exchangeData.dto';

@Injectable()
export class ExchangeService {
  constructor(
    @InjectModel(Exchange.name)
    private exchangeModel: Model<ExchangeDocument>,
  ) {}

  async createContact(body: CreateExchangeDto): Promise<Exchange> {
    return await this.exchangeModel.create(body);
  }

  // async createData(body: CreateExchangeDataDto): Promise<Exchange> {
  //   return await this.exchangeModel.create(body);
  // }

  async updateContact(id: string, body: CreateExchangeDto): Promise<Exchange> {
    return await this.exchangeModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }

  async getByTarget(id: string, type?: number): Promise<Exchange[]> {
    if (type) {
      return await this.exchangeModel
        .find({ user_target_id: id, type: type })
        .exec();
    } else {
      return await this.exchangeModel.find({ user_target_id: id }).exec();
    }
  }

  async getByRequest(id: string, type?: number): Promise<Exchange[]> {
    if (type) {
      return await this.exchangeModel
        .find({ user_requester_id: id, type })
        .exec();
    } else {
      return await this.exchangeModel.find({ user_requester_id: id }).exec();
    }
  }
}
