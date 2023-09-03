import { Injectable } from '@nestjs/common';
import { TransactionSource as TransactionsSource } from 'src/DTO/unified-txn.dto';
import { MonzoAPIService } from 'src/monzo/monzo-api.service';
import { BankApiProvider } from 'src/unified-transaction-builder/interfaces/BankAPIProvider.interface';

@Injectable()
export class TransactionsService {
  private banks: Record<TransactionsSource, BankApiProvider>;

  constructor(private readonly monzoAPIService: MonzoAPIService) {
    this.banks = {
      monzo: monzoAPIService,
      revolut: null,
      sterling: null,
    };
  }

  async getSpecificBankTransactions(source: TransactionsSource) {
    // TODO: (myko) nest has built-in error handling types
    if (!this.banks[source]) throw new Error('Requested Bank is not supported');
    return this.banks[source].serveUnifiedTransactions();
  }

  async getBankTransactions() {
    const bankTransactions = {};
    for (const [bank, bankService] of Object.entries(this.banks)) {
      bankTransactions[bank] = bankService.serveUnifiedTransactions();
    }

    return Array.from(Object.values(bankTransactions));
  }
}
