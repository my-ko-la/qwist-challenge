import { Test, TestingModule } from '@nestjs/testing';
import { MonzoAPIService } from './monzo-api.service';

describe('MonzoAPIService', () => {
  let service: MonzoAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonzoAPIService],
    }).compile();

    service = module.get<MonzoAPIService>(MonzoAPIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
