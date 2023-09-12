import { Test, TestingModule } from '@nestjs/testing';
import { DatasOneUserService } from './datas-one-user.service';

describe('GroupUserService', () => {
  let service: DatasOneUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatasOneUserService],
    }).compile();

    service = module.get<DatasOneUserService>(DatasOneUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
