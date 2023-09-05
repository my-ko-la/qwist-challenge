import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpService } from '@nestjs/axios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RevolutTxnTransformStrategy } from '../revolut-txn-transform-strategy/revolut-txn-transform-strategy.service';
import { BankApiProvider } from 'src/unified-transaction-builder/interfaces/BankAPIProvider.interface';
import { z } from 'zod';
import { map } from 'rxjs';
import { RevolutTxn } from 'src/DTO/revolut-txn.dto';

@Injectable()
export class RevolutAPIService implements BankApiProvider {
  constructor(
    private readonly HttpService: HttpService,
    private readonly RevolutTxnTransformStrategy: RevolutTxnTransformStrategy,
  ) {}

  async getTransactions() {
    return await this.HttpService.get('http://mocked-apis/api/revolut');
  }

  async serveUnifiedTransactions() {
    const txns = await this.getTransactions();
    return txns.pipe(
      map((txns) => {
        return z
          .array(RevolutTxn)
          .parse(txns.data)
          .map((txn) => {
            return this.RevolutTxnTransformStrategy.transform(txn);
          });
      }),
    );
  }
}
