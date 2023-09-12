import { Test, TestingModule } from '@nestjs/testing';
import { DataAddService } from './data-add.service';

describe('DataAddService', () => {
  let service: DataAddService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAddService],
    }).compile();

    service = module.get<DataAddService>(DataAddService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
