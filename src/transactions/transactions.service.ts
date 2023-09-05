import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { TransactionSource as TransactionsSource } from 'src/DTO/unified-txn.dto';
import { MonzoAPIService } from 'src/monzo/monzo-api.service';
import { RevolutAPIService } from 'src/revolut/revolut-api.service';
import { SterlingAPIService } from 'src/sterling/sterling-api.service';
import { BankApiProvider } from 'src/unified-transaction-builder/interfaces/BankAPIProvider.interface';

@Injectable()
export class TransactionsService {
  private banks: Record<TransactionsSource, BankApiProvider>;

  constructor(
    private readonly monzoAPIService: MonzoAPIService,
    private readonly revolutAPIService: RevolutAPIService,
    private readonly sterlingAPIService: SterlingAPIService,
  ) {
    this.banks = {
      monzo: monzoAPIService,
      revolut: revolutAPIService,
      sterling: sterlingAPIService,
    };
  }

  async getSpecificBankTransactions(source: TransactionsSource) {
    // TODO: (myko) nest has built-in error handling types
    if (!this.banks[source]) throw new Error('Requested Bank is not supported');
    const result = lastValueFrom(await this.banks[source].serveUnifiedTransactions());
    return result;
  }

  async getBankTransactions() {
    const bankTransactions = {};
    for (const [bank, bankService] of Object.entries(this.banks)) {
      bankTransactions[bank] = bankService.serveUnifiedTransactions();
    }

    return Array.from(Object.values(bankTransactions));
  }
}
