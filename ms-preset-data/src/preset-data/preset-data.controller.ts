/* eslint-disable prettier/prettier */
import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PresetDataService } from './preset-data.service';
import { PresetData } from './schemas/presetData.schema';
import { HermesService } from 'libs/hermes/src/hermes.service';
import { RpcSuccessInterceptor } from 'src/interceptors/RpcSuccessInterceptor';

@Controller('preset-data')
@UseInterceptors(RpcSuccessInterceptor)
export class PresetDataController {
  constructor(
    private readonly presetDataService: PresetDataService,
    private hermes: HermesService,
  ) {}

  @MessagePattern('GET_ALL')
  async getAll(): Promise<PresetData[]> {
    const arrPresetData = await this.presetDataService.getAlls();
    return arrPresetData;
  }

  // @MessagePattern('CELTICS')
  // async basket(): Promise<any> {
  //   console.log('celtics');
  //   const res = await this.hermes.send('LAKERS', {});
  //   return res;
  // }
}
