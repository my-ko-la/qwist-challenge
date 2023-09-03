import { Test, TestingModule } from '@nestjs/testing';
import { UnifiedTransactionBuilder } from './unified-transaction-builder.service';

describe('UnifiedTransactionBuilderService', () => {
  let service: UnifiedTransactionBuilder;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnifiedTransactionBuilder],
    }).compile();

    service = module.get<UnifiedTransactionBuilder>(UnifiedTransactionBuilder);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
