import { Test, TestingModule } from '@nestjs/testing';
import { RevolutAPIService } from './revolut-api.service';

describe('RevolutAPIService', () => {
  let service: RevolutAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevolutAPIService],
    }).compile();

    service = module.get<RevolutAPIService>(RevolutAPIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
