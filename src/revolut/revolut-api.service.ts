import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RevolutTxnTransformStrategy } from '../revolut-txn-transform-strategy/revolut-txn-transform-strategy.service';
import { BankApiProvider } from 'src/unified-transaction-builder/interfaces/BankAPIProvider.interface';
import { z } from 'zod';
import { map } from 'rxjs';
import { RevolutTxn } from 'src/DTO/revolut-txn.dto';

@Injectable()
export class RevolutAPIService implements BankApiProvider {
  constructor(
    private readonly httpService: HttpService,
    private readonly revolutTxnTransformStrategy: RevolutTxnTransformStrategy,
  ) {}

  async getTransactions() {
    return await this.httpService.get('http://mocked-apis/api/revolut');
  }

  async serveUnifiedTransactions() {
    const txns = await this.getTransactions();
    return txns.pipe(
      map((txns) => {
        return z
          .array(RevolutTxn)
          .parse(txns.data)
          .map((txn) => {
            return this.revolutTxnTransformStrategy.transform(txn);
          });
      }),
    );
  }
}
