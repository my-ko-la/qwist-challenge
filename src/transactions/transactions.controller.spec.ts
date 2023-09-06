import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { MonzoAPIService } from 'src/monzo/monzo-api.service';
import { RevolutAPIService } from 'src/revolut/revolut-api.service';
import { SterlingAPIService } from 'src/sterling/sterling-api.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { BankApisModule } from 'src/bank-apis.module';
import { TransactionsService } from './transactions.service';
import { MonzoTxnTransformStrategy } from 'src/monzo-txn-transform-strategy/monzo-txn-transform-strategy.service';
import { SterlingTxnTransformStrategy } from 'src/sterling-txn-transform-strategy/sterling-txn-transform-strategy.service';
import { RevolutTxnTransformStrategy } from 'src/revolut-txn-transform-strategy/revolut-txn-transform-strategy.service';
import { UnifiedTransactionBuilder } from 'src/unified-transaction-builder/unified-transaction-builder.service';
import { TransactionSource, TransactionType, UnifiedTxn } from 'src/DTO/unified-txn.dto';
import { mock_MonzoTransactions, unifiedMonzoTxnsFromMock } from 'src/monzo/monzo-api.service.spec';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('TransactionsController test suite', () => {
  let controller: TransactionsController;
  let monzoAPIService: MonzoAPIService;
  let transactionsService: TransactionsService;
  let sterlingAPIService: SterlingAPIService;
  let revolutAPIService: RevolutAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, BankApisModule],
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        MonzoAPIService,
        SterlingAPIService,
        RevolutAPIService,
        MonzoTxnTransformStrategy,
        SterlingTxnTransformStrategy,
        RevolutTxnTransformStrategy,
        UnifiedTransactionBuilder,
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    monzoAPIService = module.get<MonzoAPIService>(MonzoAPIService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of transactions from a given bank', async () => {
    const source = TransactionSource.MONZO;

    const mock_Response = Promise.resolve(
      of({
        data: mock_MonzoTransactions,
      } as unknown as AxiosResponse),
    );

    jest.spyOn(monzoAPIService, 'getTransactions').mockReturnValueOnce(mock_Response);

    const response = (await controller.getTransactions(source)) as {
      transactions: Array<UnifiedTxn>;
    };

    expect(response).toBeDefined();
    expect(response.transactions).toStrictEqual(unifiedMonzoTxnsFromMock);
  });

  it('should error ', async () => {
    const source = 'bozo';

    const mock_Response = Promise.resolve(
      of({
        data: mock_MonzoTransactions,
      } as unknown as AxiosResponse),
    );

    jest.spyOn(monzoAPIService, 'getTransactions').mockReturnValueOnce(mock_Response);

    expect(async () => await controller.getTransactions(source as TransactionSource)).rejects.toThrowError();
  });
});

export const mock_UnifiedTxns: Array<UnifiedTxn> = [
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
];
