import { Test, TestingModule } from '@nestjs/testing';
import { PresetDataService } from './preset-data.service';

describe('PresetDataService', () => {
  let service: PresetDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresetDataService],
    }).compile();

    service = module.get<PresetDataService>(PresetDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
