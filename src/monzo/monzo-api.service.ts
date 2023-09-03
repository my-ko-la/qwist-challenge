import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MonzoTxnTransformStrategy } from '../monzo-txn-transform-strategy/monzo-txn-transform-strategy.service';
import { BankApiProvider } from 'src/unified-transaction-builder/interfaces/BankAPIProvider.interface';

@Injectable()
export class MonzoAPIService implements BankApiProvider {
  constructor(
    private readonly HttpService: HttpService,
    private readonly MonzoTxnTransformStrategy: MonzoTxnTransformStrategy,
  ) {}

  async getTransactions() {
    return lastValueFrom(this.HttpService.get('http://mocked-apis/api/monzo'));
  }

  async serveUnifiedTransactions() {
    const txns = await this.getTransactions();
    return txns.data.map((txn) => {
      return this.MonzoTxnTransformStrategy.transform(txn);
    });
  }
}
