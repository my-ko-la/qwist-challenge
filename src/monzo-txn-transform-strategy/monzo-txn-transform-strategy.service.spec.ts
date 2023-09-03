import { Test, TestingModule } from '@nestjs/testing';
import { MonzoTxnTransformStrategy } from './monzo-txn-transform-strategy.service';

describe('MonzoTxnTransformStrategyService', () => {
  let service: MonzoTxnTransformStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonzoTxnTransformStrategy],
    }).compile();

    service = module.get<MonzoTxnTransformStrategy>(MonzoTxnTransformStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
