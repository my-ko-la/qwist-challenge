import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MonzoTxnTransformStrategy } from '../monzo-txn-transform-strategy/monzo-txn-transform-strategy.service';
import { BankApiProvider } from 'src/unified-transaction-builder/interfaces/BankAPIProvider.interface';
import { z } from 'zod';
import { map } from 'rxjs';
import { MonzoTxn } from 'src/DTO/monzo-txn.dto';

@Injectable()
export class MonzoAPIService implements BankApiProvider {
  constructor(
    private readonly httpService: HttpService,
    private readonly monzoTxnTransformStrategy: MonzoTxnTransformStrategy,
  ) {}

  async getTransactions() {
    return await this.httpService.get('http://mocked-apis/api/monzo');
  }

  async serveUnifiedTransactions() {
    const txns = await this.getTransactions();
    return txns.pipe(
      map((txns) => {
        return z
          .array(MonzoTxn)
          .parse(txns.data)
          .map((txn) => {
            return this.monzoTxnTransformStrategy.transform(txn);
          });
      }),
    );
  }
}
