import { Test, TestingModule } from '@nestjs/testing';
import { DatasOneUserController } from './datas-one-user.controller';

describe('GroupUserController', () => {
  let controller: DatasOneUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatasOneUserController],
    }).compile();

    controller = module.get<DatasOneUserController>(DatasOneUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
