import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { MonzoTxnDto } from 'src/DTO/monzo-txn.dto';
import { RevolutTxnDto } from 'src/DTO/revolut-txn.dto';
import { SterlingTxnDto } from 'src/DTO/sterling-txn.dto';
import { UnifiedTxn } from 'src/DTO/unified-txn.dto';

type Transaction = (MonzoTxnDto | MonzoTxnDto[]) &
  (SterlingTxnDto | SterlingTxnDto[]) &
  (RevolutTxnDto | RevolutTxnDto[]);
export type BankApiTransactionResponse = Promise<Observable<Transaction | Array<Transaction>>>;

export interface BankApiProvider {
  getTransactions: () => Promise<AxiosResponse<any, any>>;
  serveUnifiedTransactions: () => Promise<UnifiedTxn[]>;
}
