import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpService } from '@nestjs/axios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SterlingTxnTransformStrategy } from '../sterling-txn-transform-strategy/sterling-txn-transform-strategy.service';
import { BankApiProvider } from 'src/unified-transaction-builder/interfaces/BankAPIProvider.interface';
import { z } from 'zod';
import { map } from 'rxjs';
import { SterlingTxn } from 'src/DTO/sterling-txn.dto';

@Injectable()
export class SterlingAPIService implements BankApiProvider {
  constructor(
    private readonly HttpService: HttpService,
    private readonly SterlingTxnTransformStrategy: SterlingTxnTransformStrategy,
  ) {}

  async getTransactions() {
    return await this.HttpService.get('http://mocked-apis/api/sterling');
  }

  async serveUnifiedTransactions() {
    const txns = await this.getTransactions();
    return txns.pipe(
      map((txns) => {
        return z
          .array(SterlingTxn)
          .parse(txns.data)
          .map((txn) => {
            return this.SterlingTxnTransformStrategy.transform(txn);
          });
      }),
    );
  }
}
