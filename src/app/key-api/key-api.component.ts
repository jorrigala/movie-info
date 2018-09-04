import { Component, OnInit } from '@angular/core';

import { KeyApiService } from '../key-api.service';
import { MovieService } from '../movie.service';
import { ApiKey } from '../api-key';

@Component({
  selector: 'app-key-api',
  templateUrl: './key-api.component.html',
  styleUrls: ['./key-api.component.css']
})
export class KeyApiComponent implements OnInit {

  OMDb_Key_Api = '';
  isValidKey: boolean;
  errorMessage: string;
  apiKey: ApiKey;

  constructor(private keyApiService: KeyApiService,
              private movieService: MovieService) { }

  ngOnInit() {
      this.apiKey = this.keyApiService.getOMDbKeyApi();
      this.isValidKey = this.apiKey.isValid;
      this.OMDb_Key_Api = this.apiKey.key;
      if (!this.isValidKey) {
          this.setOMDbKeyApi();
      }
  }

  setOMDbKeyApi(): void {
      this.apiKey.key = this.OMDb_Key_Api;
      this.keyApiService
      .setOMDbKeyApi(this.apiKey);

      // validation the key
      this.isValidKey = false;
      this.apiKey.isValid = this.isValidKey;
      this.movieService
      .getMovie('alpha')
      .subscribe(movie => {this.isValidKey = movie.imdbID.length > 0;
  this.apiKey.isValid = this.isValidKey; },
      error => {this.errorMessage = error.error.Error; });
  }

}
