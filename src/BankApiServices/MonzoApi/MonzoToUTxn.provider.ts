import { Injectable } from '@nestjs/common';
import { MonzoAPIService } from './MonzoAPI.service';
import { UTBuilder } from '../UnifiedTxn-Builder';
// import { MonzoTxnDto } from 'src/DTO/monzo-txn.dto';
// import { TransactionSource, TransactionType } from 'src/DTO/unified-txn.dto';

@Injectable()
export class MonzoTransformer {
  constructor(
    private readonly monzoApiService: MonzoAPIService,
    private readonly unifiedTxnBuilder: UTBuilder,
  ) {}

  transform = () => {
    // const txns = this.monzoApiService.getTransactions();
    // return txns.map((txn: MonzoTxnDto) => {
    //   return this.unifiedTxnBuilder
    //     .withId(txn.id)
    //     .withDescription(txn.description)
    //     .withCreated(txn.created)
    //     .withType(txn.amount > 0 ? TransactionType.CREDIT : TransactionType.DEBIT)
    //     .withAmount({
    //       value: txn.amount > 0 ? `${txn.amount}` : `-${txn.amount}`,
    //       currency: txn.currency,
    //     })
    //     .withMetadata({
    //       source: TransactionSource.MONZO,
    //     })
    //     .withReference(txn.metadata.reference)
    //     .build();
    // });
  };
}
