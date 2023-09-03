import { Test, TestingModule } from '@nestjs/testing';
import { MockAPIService } from './mocked-api.service';

describe('MockedApiService', () => {
  let service: MockAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockAPIService],
    }).compile();

    service = module.get<MockAPIService>(MockAPIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
