import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { MonzoTxnType } from 'src/DTO/monzo-txn.dto';
import { RevolutTxnType } from 'src/DTO/revolut-txn.dto';
import { SterlingTxnType } from 'src/DTO/sterling-txn.dto';
import { UnifiedTxn } from 'src/DTO/unified-txn.dto';

type Transaction = (MonzoTxnType | MonzoTxnType[]) &
  (SterlingTxnType | SterlingTxnType[]) &
  (RevolutTxnType | RevolutTxnType[]);
export type BankApiTransactionResponse = Promise<Observable<Transaction | Array<Transaction>>>;

export interface BankApiProvider {
  getTransactions: () => Promise<Observable<AxiosResponse<any, any>>>;
  serveUnifiedTransactions: () => Promise<Observable<UnifiedTxn[]>>;
}
