import { Test, TestingModule } from '@nestjs/testing';
import { CustomdataController } from './customdata.controller';

describe('MsCustumdataController', () => {
  let controller: CustomdataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomdataController],
    }).compile();

    controller = module.get<CustomdataController>(CustomdataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
