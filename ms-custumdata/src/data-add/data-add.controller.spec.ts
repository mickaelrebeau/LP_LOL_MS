import { Test, TestingModule } from '@nestjs/testing';
import { DataAddController } from './data-add.controller';

describe('DataAddController', () => {
  let controller: DataAddController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataAddController],
    }).compile();

    controller = module.get<DataAddController>(DataAddController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
