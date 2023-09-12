import { Test, TestingModule } from '@nestjs/testing';
import { CustomdataService } from './customdata.service';

describe('MsCustumdataService', () => {
  let service: CustomdataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomdataService],
    }).compile();

    service = module.get<CustomdataService>(CustomdataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
