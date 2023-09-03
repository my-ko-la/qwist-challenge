import { Injectable } from '@nestjs/common';
import * as nock from 'nock';
import { promises } from 'fs';

const ABSOLUTE_PATHS_TO_MOCKS = {
  monzo: '../finleap-challenge/src/samples/monzo-tx.json',
  revolut: '../finleap-challenge/src/samples/revolut-tx.json',
  sterling: '../finleap-challenge/src/samples/sterling-tx.json',
};

@Injectable()
export class MockAPIService {
  mockAPI = async () => {
    for (const [bank, path] of Object.entries(ABSOLUTE_PATHS_TO_MOCKS)) {
      const mockedData = await promises.readFile(path, 'utf8');
      const txns = JSON.parse(mockedData);

      nock(`http://mocked-apis`).get(`/api/${bank}`).times(Infinity).reply(200, txns);

      //  console.log(apis)
    }
  };
}
