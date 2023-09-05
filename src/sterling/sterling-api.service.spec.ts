import { Test, TestingModule } from '@nestjs/testing';
import { SterlingAPIService } from './sterling-api.service';

describe('SterlingAPIService', () => {
  let service: SterlingAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SterlingAPIService],
    }).compile();

    service = module.get<SterlingAPIService>(SterlingAPIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
