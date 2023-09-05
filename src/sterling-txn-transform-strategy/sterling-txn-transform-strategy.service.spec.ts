import { Test, TestingModule } from '@nestjs/testing';
import { SterlingTxnTransformStrategy } from './sterling-txn-transform-strategy.service';

describe('SterlingTxnTransformStrategyService', () => {
  let service: SterlingTxnTransformStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SterlingTxnTransformStrategy],
    }).compile();

    service = module.get<SterlingTxnTransformStrategy>(SterlingTxnTransformStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
