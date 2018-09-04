import { Component, OnInit } from '@angular/core';

import { KeyApiService } from '../key-api.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-key-api',
  templateUrl: './key-api.component.html',
  styleUrls: ['./key-api.component.css']
})
export class KeyApiComponent implements OnInit {

  OMDb_Key_Api = '';
  isValidKey: boolean;
  errorMessage: string;

  constructor(private keyApiService: KeyApiService,
              private movieService: MovieService) { }

  ngOnInit() {
      this.OMDb_Key_Api = this.keyApiService.getOMDbKeyApi();
      this.setOMDbKeyApi();
  }

  setOMDbKeyApi(): void {
      this.keyApiService
      .setOMDbKeyApi(this.OMDb_Key_Api);

      // validation the key
      this.isValidKey = false;
      this.movieService
      .getMovie('alpha')
      .subscribe(movie => {this.isValidKey = movie.imdbID.length > 0; },
      error => {this.errorMessage = error.error.Error; console.log(error);});
  }

}
