import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SterlingTxnTransformStrategy } from '../sterling-txn-transform-strategy/sterling-txn-transform-strategy.service';
import { BankApiProvider } from 'src/unified-transaction-builder/interfaces/BankAPIProvider.interface';
import { z } from 'zod';
import { map } from 'rxjs';
import { SterlingTxn } from 'src/DTO/sterling-txn.dto';

@Injectable()
export class SterlingAPIService implements BankApiProvider {
  constructor(
    private readonly httpService: HttpService,
    private readonly sterlingTxnTransformStrategy: SterlingTxnTransformStrategy,
  ) {}

  async getTransactions() {
    return await this.httpService.get('http://mocked-apis/api/sterling');
  }

  async serveUnifiedTransactions() {
    const txns = await this.getTransactions();
    return txns.pipe(
      map((txns) => {
        return z
          .array(SterlingTxn)
          .parse(txns.data)
          .map((txn) => {
            return this.sterlingTxnTransformStrategy.transform(txn);
          });
      }),
    );
  }
}
