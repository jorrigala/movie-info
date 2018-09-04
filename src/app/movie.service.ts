import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as camelCaseKeysDeep from 'camelcase-keys-deep/index';

import { Movie } from './movie';
import { MovieSearch } from './movie-search';
import { KeyApiService } from './key-api.service';

@Injectable()
export class MovieService {

  OMDb_API = '//www.omdbapi.com/?apikey=';
  constructor(
    private http: HttpClient,
    private keyApiService: KeyApiService) { }

  getOMDBURI(): string {
      return this.OMDb_API + this.keyApiService.getOMDbKeyApi().key + '&';
  }

  getMovie(movie: string): Observable<Movie> {
      return this.http.get<Movie>(this.getOMDBURI() + 't=' + movie)
      .pipe(
        map( response => {
            return camelCaseKeysDeep(response);
        })
      );
  }

  getMovies(movie: string): Observable<MovieSearch> {
      return this.http.get<MovieSearch>(this.getOMDBURI() + 's=' + movie + '&type=movie')
      .pipe(
        map( response => {
            return camelCaseKeysDeep(response);
        })
      );
  }
}
