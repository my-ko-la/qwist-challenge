// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpService } from '@nestjs/axios';
import { Controller, Get, UsePipes } from '@nestjs/common';
// TODO: fix configs
// eslint-disable-next-line prettier/prettier
import { BankApiProvider, BankApiTransactionResponse } from '../Interfaces/BankAPIProvider.interface';
import { MonzoTxnDto } from 'src/DTO/monzo-txn.dto';
// import { map } from 'rxjs';
import { ZodValidationPipe } from 'nestjs-zod';
import { map } from 'rxjs';

// @Injectable()
@Controller('/monzo-api')
@UsePipes(new ZodValidationPipe(MonzoTxnDto))
export class MonzoAPIService implements BankApiProvider {
  constructor(private readonly HttpService: HttpService) {}

  @Get()
  getTransactions = async (): BankApiTransactionResponse => {
    return this.HttpService.get('http://mocked/api/monzo').pipe(
      map((response) => {
        console.log(response);
        return response.data;
      }),
    );
  };
}
