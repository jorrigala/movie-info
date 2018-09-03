import { Injectable } from '@angular/core';

@Injectable()
export class KeyApiService {

  // need to develop keystore
  OMDb_Key_Api: string;
  constructor() { }

  getOMDbKeyApi(): string {
      return this.OMDb_Key_Api;
  }

  setOMDbKeyApi(keyApi: string): void {
      this.OMDb_Key_Api = keyApi;
  }

}
