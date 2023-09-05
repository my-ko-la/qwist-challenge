import { Test, TestingModule } from '@nestjs/testing';
import { RevolutTxnTransformStrategy } from './revolut-txn-transform-strategy.service';

describe('RevolutTxnTransformStrategyService', () => {
  let service: RevolutTxnTransformStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevolutTxnTransformStrategy],
    }).compile();

    service = module.get<RevolutTxnTransformStrategy>(RevolutTxnTransformStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
