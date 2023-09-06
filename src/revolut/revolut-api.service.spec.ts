import { Test, TestingModule } from '@nestjs/testing';
import { RevolutAPIService } from './revolut-api.service';
import { AxiosResponse } from 'axios';
import { RevolutTxnTransformStrategy } from '../revolut-txn-transform-strategy/revolut-txn-transform-strategy.service';
import { RevolutTxnType } from 'src/DTO/revolut-txn.dto';
import { HttpModule } from '@nestjs/axios';
import { BankApisModule } from 'src/bank-apis.module';
import { UnifiedTransactionBuilder } from 'src/unified-transaction-builder/unified-transaction-builder.service';
import { lastValueFrom, of } from 'rxjs';
import { TransactionSource, TransactionType, UnifiedTxn } from 'src/DTO/unified-txn.dto';

describe('RevolutAPIService test suite', () => {
  let revolutAPIService: RevolutAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, BankApisModule],
      providers: [RevolutAPIService, RevolutTxnTransformStrategy, UnifiedTransactionBuilder],
    }).compile();

    revolutAPIService = module.get<RevolutAPIService>(RevolutAPIService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(revolutAPIService).toBeDefined();
  });

  it('should fetch and transform a list of Revolut transactions, in UnifiedTxn shape', async () => {
    const mock_Response = Promise.resolve(
      of({
        data: mock_RevolutTransactions,
      } as unknown as AxiosResponse),
    );

    jest.spyOn(revolutAPIService, 'getTransactions').mockReturnValueOnce(mock_Response);
    const unifiedTxns = await lastValueFrom(await revolutAPIService.serveUnifiedTransactions());

    expect(unifiedTxns).toStrictEqual(unifiedRevolutTxnsFromMock);
  });

  it('should fetch Revolut txns, try to transform, but fail, given wrong data shape', async () => {
    const mock_Response = Promise.resolve(
      of({
        data: 'random string',
      } as unknown as AxiosResponse),
    );

    jest.spyOn(revolutAPIService, 'getTransactions').mockReturnValueOnce(mock_Response);

    expect(async () => await lastValueFrom(await revolutAPIService.serveUnifiedTransactions())).rejects.toThrowError();
  });
});

export const mock_RevolutTransactions: Array<RevolutTxnType> = [
  {
    id: 'tr_1357908642',
    created_at: '2022-03-21T14:16:32.000Z',
    completed_at: '2022-03-21T14:18:32.000Z',
    state: 'COMPLETED',
    amount: {
      value: '-12.50',
      currency: 'EUR',
    },
    merchant: null,
    counterparty: {
      id: 'acc_1357908642',
      name: 'Sarah Johnson',
    },
    reference: 'SEPA-1357908642',
  },
  {
    id: 'tr_2468013579',
    created_at: '2022-03-21T14:16:32.000Z',
    completed_at: '2022-03-21T14:18:32.000Z',
    state: 'COMPLETED',
    amount: {
      value: '-6.95',
      currency: 'EUR',
    },
    merchant: null,
    counterparty: {
      id: 'acc_2468013579',
      name: 'Michael Brown',
    },
    reference: 'SEPA-2468013579',
  },
  {
    id: 'tr_3692581470',
    created_at: '2022-03-21T14:16:32.000Z',
    completed_at: '2022-03-21T14:18:32.000Z',
    state: 'COMPLETED',
    amount: {
      value: '45.67',
      currency: 'EUR',
    },
    merchant: null,
    counterparty: {
      id: 'acc_3692581470',
      name: 'Alexandra Lee',
    },
    reference: 'SEPA-3692581470',
  },
];

export const unifiedRevolutTxnsFromMock: Array<UnifiedTxn> = [
  {
    id: 'tr_1357908642',
    created: '2022-03-21T14:16:32.000Z',
    amount: {
      value: '-12.50',
      currency: 'EUR',
    },
    reference: 'SEPA-1357908642',
    description: 'Payment to Sarah Johnson',
    metadata: {
      source: TransactionSource.REVOLUT,
    },
    type: TransactionType.DEBIT,
  },
  {
    id: 'tr_2468013579',
    created: '2022-03-21T14:16:32.000Z',
    amount: {
      value: '-6.95',
      currency: 'EUR',
    },
    reference: 'SEPA-2468013579',
    description: 'Payment to Michael Brown',
    metadata: {
      source: TransactionSource.REVOLUT,
    },
    type: TransactionType.DEBIT,
  },
  {
    id: 'tr_3692581470',
    created: '2022-03-21T14:16:32.000Z',
    amount: {
      value: '45.67',
      currency: 'EUR',
    },
    description: 'Payment from Alexandra Lee',
    metadata: {
      source: TransactionSource.REVOLUT,
    },
    reference: 'SEPA-3692581470',
    type: TransactionType.CREDIT,
  },
];
