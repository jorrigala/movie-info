import { Injectable } from '@angular/core';

import { ApiKey } from './api-key';

@Injectable()
export class KeyApiService {

  // need to develop keystore
  apiKey = new ApiKey();
  constructor() { }

  getOMDbKeyApi(): ApiKey {
      return this.apiKey;
  }

  setOMDbKeyApi(keyApi: ApiKey): void {
      this.apiKey = keyApi;
  }

  isValidKey(): boolean {
      return this.getOMDbKeyApi().isValid;
  }

}
