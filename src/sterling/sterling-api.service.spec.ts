import { Test, TestingModule } from '@nestjs/testing';
import { SterlingAPIService } from './sterling-api.service';
import { AxiosResponse } from 'axios';
import { SterlingTxnTransformStrategy } from '../sterling-txn-transform-strategy/sterling-txn-transform-strategy.service';
import { SterlingTxnType } from 'src/DTO/sterling-txn.dto';
import { HttpModule } from '@nestjs/axios';
import { BankApisModule } from 'src/bank-apis.module';
import { UnifiedTransactionBuilder } from 'src/unified-transaction-builder/unified-transaction-builder.service';
import { lastValueFrom, of } from 'rxjs';
import { TransactionSource, TransactionType, UnifiedTxn } from 'src/DTO/unified-txn.dto';

describe('sterlingAPIService test suite', () => {
  let sterlingAPIService: SterlingAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, BankApisModule],
      providers: [SterlingAPIService, SterlingTxnTransformStrategy, UnifiedTransactionBuilder],
    }).compile();

    sterlingAPIService = module.get<SterlingAPIService>(SterlingAPIService);
  });

  it('should be defined', () => {
    expect(sterlingAPIService).toBeDefined();
  });

  it('should fetch and transform a list of Sterling transactions, in UnifiedTxn shape', async () => {
    const mock_Response = Promise.resolve(
      of({
        data: mock_SterlingTransactions,
      } as unknown as AxiosResponse),
    );

    jest.spyOn(sterlingAPIService, 'getTransactions').mockReturnValueOnce(mock_Response);
    const unifiedTxns = await lastValueFrom(await sterlingAPIService.serveUnifiedTransactions());

    expect(unifiedTxns).toStrictEqual(unifiedSterlingTxnsFromMock);
  });

  it('should fetch Sterling txns, try to transform, but fail, given wrong data shape', async () => {
    const mock_Response = Promise.resolve(
      of({
        data: 'hello world',
      } as unknown as AxiosResponse),
    );

    jest.spyOn(sterlingAPIService, 'getTransactions').mockReturnValueOnce(mock_Response);

    expect(async () => await lastValueFrom(await sterlingAPIService.serveUnifiedTransactions())).rejects.toThrowError();
  });
});

export const mock_SterlingTransactions: Array<SterlingTxnType> = [
  {
    id: '45f8b15e-12c7-4411-8f47-f6c9a6eb22c6',
    currency: 'EUR',
    amount: '500.00',
    direction: 'IN',
    narrative: 'Salary payment',
    created: '2023-04-01T13:47:00.000Z',
    reference: 'SEPA-1234567896',
  },
  {
    id: '7a2b8a67-b7aa-4e50-a833-0e5bcf8b17a6',
    currency: 'EUR',
    amount: '-72.40',
    direction: 'OUT',
    narrative: 'Grocery shopping',
    created: '2023-04-04T10:05:00.000Z',
    reference: 'SEPA-1234567897',
  },
  {
    id: 'e2d3dd0d-3f36-4339-8e16-3fb3ee59c342',
    currency: 'EUR',
    amount: '-15.00',
    direction: 'OUT',
    narrative: 'Public transportation fare',
    created: '2023-04-01T08:55:00.000Z',
    reference: 'SEPA-1234567898',
  },
];

export const unifiedSterlingTxnsFromMock: Array<UnifiedTxn> = [
  {
    id: '45f8b15e-12c7-4411-8f47-f6c9a6eb22c6',
    amount: {
      value: '500.00',
      currency: 'EUR',
    },
    description: 'Salary payment',
    created: '2023-04-01T13:47:00.000Z',
    reference: 'SEPA-1234567896',
    type: TransactionType.CREDIT,
    metadata: { source: TransactionSource.STERLING },
  },
  {
    id: '7a2b8a67-b7aa-4e50-a833-0e5bcf8b17a6',
    amount: {
      value: '-72.40',
      currency: 'EUR',
    },
    description: 'Grocery shopping',
    created: '2023-04-04T10:05:00.000Z',
    reference: 'SEPA-1234567897',
    type: TransactionType.DEBIT,
    metadata: { source: TransactionSource.STERLING },
  },
  {
    id: 'e2d3dd0d-3f36-4339-8e16-3fb3ee59c342',
    amount: {
      value: '-15.00',
      currency: 'EUR',
    },
    description: 'Public transportation fare',
    created: '2023-04-01T08:55:00.000Z',
    reference: 'SEPA-1234567898',
    type: TransactionType.DEBIT,
    metadata: { source: TransactionSource.STERLING },
  },
];
