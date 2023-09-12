import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { PresetDataService } from '../preset-data.service';
import { Seeds } from './all.seed';

@Injectable()
export class PresetDataSeed {
  constructor(private readonly presetDataService: PresetDataService) {}

  @Command({ command: 'create:preset-data', describe: 'create preset-data' })
  async create() {
    const presetData = await this.presetDataService.create(Seeds);
    console.log('seed', presetData);
  }
}
