import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { MonzoAPIService } from './monzo-api.service';
import { MonzoTxnType } from 'src/DTO/monzo-txn.dto';
import { HttpModule } from '@nestjs/axios';
import { BankApisModule } from 'src/bank-apis.module';
import { MonzoTxnTransformStrategy } from 'src/monzo-txn-transform-strategy/monzo-txn-transform-strategy.service';
import { UnifiedTransactionBuilder } from 'src/unified-transaction-builder/unified-transaction-builder.service';
import { lastValueFrom, of } from 'rxjs';
import { TransactionSource, TransactionType, UnifiedTxn } from 'src/DTO/unified-txn.dto';

describe('MonzoAPIService test suite', () => {
  let monzoAPIService: MonzoAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, BankApisModule],
      providers: [MonzoAPIService, MonzoTxnTransformStrategy, UnifiedTransactionBuilder],
    }).compile();

    monzoAPIService = module.get<MonzoAPIService>(MonzoAPIService);
  });

  it('should be defined', () => {
    expect(monzoAPIService).toBeDefined();
  });

  it('should fetch and transform a list of Monzo transactions, in UnifiedTxn shape', async () => {
    const mock_Response = Promise.resolve(
      of({
        data: mock_MonzoTransactions,
      } as unknown as AxiosResponse),
    );

    jest.spyOn(monzoAPIService, 'getTransactions').mockReturnValueOnce(mock_Response);
    const unifiedTxns = await lastValueFrom(await monzoAPIService.serveUnifiedTransactions());

    expect(unifiedTxns).toStrictEqual(unifiedMonzoTxnsFromMock);
  });
});

export const mock_MonzoTransactions: Array<MonzoTxnType> = [
  {
    id: 'tx_00002EhXqVqJ4nWjKf4v5R',
    created: '2023-04-04T14:30:00.000Z',
    description: 'Electricity bill payment',
    amount: -9500,
    currency: 'EUR',
    metadata: {
      reference: 'SEPA-0987654322',
    },
  },
  {
    id: 'tx_00002EhXqVqJ4nWjKf4v5Q',
    created: '2023-04-04T14:35:00.000Z',
    description: 'Water bill payment',
    amount: 7500,
    currency: 'EUR',
    metadata: {
      reference: 'SEPA-0987654321',
    },
  },
];

export const unifiedMonzoTxnsFromMock: Array<UnifiedTxn> = [
  {
    id: 'tx_00002EhXqVqJ4nWjKf4v5R',
    created: '2023-04-04T14:30:00.000Z',
    description: 'Electricity bill payment',
    amount: {
      value: '-9500.00',
      currency: 'EUR',
    },
    metadata: {
      source: TransactionSource.MONZO,
    },
    reference: 'SEPA-0987654322',
    type: TransactionType.DEBIT,
  },
  {
    id: 'tx_00002EhXqVqJ4nWjKf4v5Q',
    created: '2023-04-04T14:35:00.000Z',
    description: 'Water bill payment',
    amount: {
      value: '7500.00',
      currency: 'EUR',
    },
    metadata: {
      source: TransactionSource.MONZO,
    },
    reference: 'SEPA-0987654321',
    type: TransactionType.CREDIT,
  },
];
