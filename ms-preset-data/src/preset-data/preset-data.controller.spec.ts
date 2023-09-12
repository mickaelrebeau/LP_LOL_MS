import { Test, TestingModule } from '@nestjs/testing';
import { PresetDataController } from './preset-data.controller';

describe('PresetDataController', () => {
  let controller: PresetDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresetDataController],
    }).compile();

    controller = module.get<PresetDataController>(PresetDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
