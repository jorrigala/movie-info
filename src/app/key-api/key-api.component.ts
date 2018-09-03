import { Component, OnInit } from '@angular/core';

import { KeyApiService } from '../key-api.service';

@Component({
  selector: 'app-key-api',
  templateUrl: './key-api.component.html',
  styleUrls: ['./key-api.component.css']
})
export class KeyApiComponent implements OnInit {

  OMDb_Key_Api = '';

  constructor(private keyApiService: KeyApiService) { }

  ngOnInit() {
      this.OMDb_Key_Api = this.keyApiService.getOMDbKeyApi();
  }

  setOMDbKeyApi(): void {
      this.keyApiService.setOMDbKeyApi(this.OMDb_Key_Api);
  }

}
