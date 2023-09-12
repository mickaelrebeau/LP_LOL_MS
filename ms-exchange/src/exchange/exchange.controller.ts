import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ExchangeService } from './exchange.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateExchangeDto } from './dtos/exchange.dto';
import { Exchange } from './schemas/exchange.schema';
import { HermesService } from 'libs/hermes/src';
// import { CreateExchangeDataDto } from './dtos/exchangeData.dto';

@Controller('exchange')
export class ExchangeController {
  constructor(
    private readonly exchangeService: ExchangeService,
    private readonly hermes: HermesService, // @Inject('USER_SERVICE') private readonly userSercieClient: ClientProxy,
  ) {}

  // @MessagePattern('CELTICS')
  // async test(): Promise<String> {
  //   console.log('test');
  //   return 'it works!';
  // }

  // @MessagePattern('CREATE_EXCHANGE_CONTACT')
  @MessagePattern('CREATE_EXCHANGE')
  async createExchangeContact(
    @Payload('body', new ValidationPipe())
    body: CreateExchangeDto,
  ): Promise<{ data: Exchange }> {
    console.log(body);
    const data = await this.exchangeService.createContact(body);

    return { data };
  }

  // @MessagePattern('CREATE_EXCHANGE_DATA')
  // @Post('/data')
  // async createExchangeData(
  //   @Body(new ValidationPipe())
  //   CreateExchangeDataDto: CreateExchangeDataDto,
  // ): Promise<Exchange> {
  //   const exchange = await this.exchangeService.createData(
  //     CreateExchangeDataDto,
  //   );

  //   return exchange;
  // }

  @Put('/:id')
  @MessagePattern('UPDATE_EXCHANGE')
  async updateContact(
    @Payload('body', new ValidationPipe())
    body: CreateExchangeDto,
    @Payload('params')
    params: any,
  ): Promise<{ data: Exchange }> {
    console.log(params.id);
    const data = await this.exchangeService.updateContact(params.id, body);
    return { data };
  }

  // @Post('/test')
  // async testing(
  //   @Body()
  //   body: string[],
  // ): Promise<any> {
  //   console.log(body, 'body');
  //   console.log('test');
  //   const test = await this.hermes.send('john_doe', body);
  //   console.log(test);
  //   return test;
  // }

  @MessagePattern('GET_EXCHANGE_BY_TARGET_ID')
  @Get('/:id')
  async getAllByUserTarget(@Payload('params') params: any): Promise<any> {
    console.log(params.id);
    let exchanges = await this.exchangeService.getByTarget(params.id);
    console.log('exchange', exchanges);
    let arrRequesterId = [];
    exchanges.forEach((exchange) => {
      arrRequesterId.push(exchange.user_requester_id);
    });
    // console.log(arrRequesterId);
    const arrPseudoRequester = await this.hermes.send(
      'ARRAY_IDS',
      arrRequesterId,
    );
    let data = [];
    // console.log(arrPseudoRequester);
    for (let i = 0; i < exchanges.length; i++) {
      const exchange = exchanges[i];
      let obj = {
        //@ts-ignore
        _id: exchange._id,
        user_target_id: exchange.user_target_id,
        unseen_target: exchange.unseen_target,
        unseen_requester: exchange.unseen_requester,
        user_requester_id: exchange.user_requester_id,
        pseudo_requester: arrPseudoRequester[i],
        type: exchange.type,
        status: exchange.status,
        logs: exchange.logs,
        //@ts-ignore
        createdAt: exchange.createdAt,
        //@ts-ignore
        updateAt: exchange.updatedAt,
      };
      data.push(obj);
    }
    console.log('res', data);
    return { data };
  }

  @MessagePattern('GET_EXCHANGE_BY_REQUESTER_ID')
  async getAllByUserRequester(@Payload('params') params: any): Promise<any> {
    let exchanges = await this.exchangeService.getByRequest(params.id);
    let arrTargetId = [];
    exchanges.forEach((exchange) => {
      arrTargetId.push(exchange.user_requester_id);
    });
    // console.log(arrRequesterId);
    const arrPseudoTarget = await this.hermes.send('ARRAY_IDS', arrTargetId);
    let data = [];
    // console.log(arrPseudoRequester);
    for (let i = 0; i < exchanges.length; i++) {
      const exchange = exchanges[i];
      let obj = {
        //@ts-ignore
        _id: exchange._id,
        user_target_id: exchange.user_target_id,
        unseen_target: exchange.unseen_target,
        unseen_requester: exchange.unseen_requester,
        user_requester_id: exchange.user_requester_id,
        pseudo_target: arrPseudoTarget[i],
        type: exchange.type,
        status: exchange.status,
        logs: exchange.logs,
        //@ts-ignore
        createdAt: exchange.createdAt,
        //@ts-ignore
        updateAt: exchange.updatedAt,
      };
      data.push(obj);
    }
    console.log(data);
    return { data };
  }

  @MessagePattern('GET_EXCHANGE_BY_TARGET_ID_AND_TYPE')
  async getAllByUserTargetAndType(
    @Payload('params') params: any,
  ): Promise<any> {
    let exchanges = await this.exchangeService.getByTarget(
      params.id,
      params.type,
    );
    let arrRequesterId = [];
    console.log('exchange', exchanges);
    exchanges.forEach((exchange) => {
      arrRequesterId.push(exchange.user_requester_id);
    });
    // console.log(arrRequesterId);
    const arrPseudoRequester = await this.hermes.send(
      'ARRAY_IDS',
      arrRequesterId,
    );
    let data = [];
    // console.log(arrPseudoRequester);
    for (let i = 0; i < exchanges.length; i++) {
      const exchange = exchanges[i];
      let obj = {
        //@ts-ignore
        _id: exchange._id,
        user_target_id: exchange.user_target_id,
        unseen_target: exchange.unseen_target,
        unseen_requester: exchange.unseen_requester,
        user_requester_id: exchange.user_requester_id,
        pseudo_requester: arrPseudoRequester[i],
        type: exchange.type,
        status: exchange.status,
        logs: exchange.logs,
        //@ts-ignore
        createdAt: exchange.createdAt,
        //@ts-ignore
        updateAt: exchange.updatedAt,
      };
      data.push(obj);
    }
    console.log(data);
    return { data };
  }

  @MessagePattern('GET_EXCHANGE_BY_REQUESTER_ID_AND_TYPE')
  async getAllByUserRequesterAndType(
    @Payload('params') params: any,
  ): Promise<any> {
    let exchanges = await this.exchangeService.getByRequest(
      params.id,
      params.type,
    );
    let arrTargetId = [];
    exchanges.forEach((exchange) => {
      arrTargetId.push(exchange.user_requester_id);
    });
    // console.log(arrRequesterId);
    const arrPseudoTarget = await this.hermes.send('ARRAY_IDS', arrTargetId);
    let data = [];
    // console.log(arrPseudoRequester);
    for (let i = 0; i < exchanges.length; i++) {
      const exchange = exchanges[i];
      let obj = {
        //@ts-ignore
        _id: exchange._id,
        user_target_id: exchange.user_target_id,
        unseen_target: exchange.unseen_target,
        unseen_requester: exchange.unseen_requester,
        user_requester_id: exchange.user_requester_id,
        pseudo_target: arrPseudoTarget[i],
        type: exchange.type,
        status: exchange.status,
        logs: exchange.logs,
        //@ts-ignore
        createdAt: exchange.createdAt,
        //@ts-ignore
        updateAt: exchange.updatedAt,
      };
      data.push(obj);
    }
    console.log(data);
    return { data };
  }
}
