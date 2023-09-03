import nock from 'nock';
import { Injectable } from '@nestjs/common';
import { promises } from 'fs';

const ABSOLUTE_PATHS_TO_MOCKS_MAP = {
  monzo: './samples/monzo-tx.json',
  revolut: './samples/revolut-tx.json',
  sterling: './samples/sterling-tx.json',
};

@Injectable()
export class MockAPIService {
  static mockAPI = async () => {
    for (const [bank, path] of Object.entries(ABSOLUTE_PATHS_TO_MOCKS_MAP)) {
      const mockedData = await promises.readFile(path, 'utf8');
      const txns = JSON.parse(mockedData);

      nock(`http://mocked`).get(`/api/${bank}`).reply(200, txns);
    }
  };
}
