import { BadRequestException, Injectable } from '@nestjs/common';
import { forkJoin, lastValueFrom } from 'rxjs';
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
    if (!this.banks[source])
      throw new BadRequestException({ statusCode: 400, message: 'Either bank does not exist or is not supported' });
    const transactions = await lastValueFrom(await this.banks[source].serveUnifiedTransactions());
    return {
      transactions: transactions,
    };
  }

  async getAllBankTransactions() {
    const bankTransactions = {};
    for (const [bank, bankService] of Object.entries(this.banks)) {
      bankTransactions[bank] = await bankService.serveUnifiedTransactions();
    }

    const allTransactions = Object.values(await lastValueFrom(forkJoin(bankTransactions))).flat();

    return {
      transactions: allTransactions,
    };
  }
}
