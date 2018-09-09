import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as camelCaseKeysDeep from 'camelcase-keys-deep/index';

import { Movie } from './movie';
import { MovieSearch } from './movie-search.model';
import { KeyApiService } from './key-api.service';
import { MovieSearchMapper } from './mapper/movie-search.mapper';

@Injectable()
export class MovieService {

  OMDb_API = '//www.omdbapi.com/?apikey=';
  constructor(
    private http: HttpClient,
    private keyApiService: KeyApiService,
    private movieSearchMapper: MovieSearchMapper) { }

  getOMDBURI(): string {
      return this.OMDb_API + this.keyApiService.getOMDbKeyApi().key + '&';
  }

  getMovie(movie: string): Observable<Movie> {
      return this.http.get<Movie>(this.getOMDBURI() + 't=' + movie)
      .pipe(
        map( this.getCamelCaseKeysDeep )
      );
  }

  getMovies(movie: string, pageNumber: number): Observable<MovieSearch> {
      return this.http.get<MovieSearch>(this.getOMDBURI() + 's=' + movie + '&type=movie&page=' + pageNumber)
      .pipe(
        map( this.getCamelCaseKeysDeep ),
        map( this.movieSearchMapper.decodeMovieSearch.bind(this.movieSearchMapper) )
      );
  }

  getMoviebyImdbId(imdbId: string ): Observable<Movie> {
      return this.http.get<Movie>(this.getOMDBURI() + 'i=' + imdbId + '&type=movie')
      .pipe(
        map( this.getCamelCaseKeysDeep )
      );
  }

  getCamelCaseKeysDeep(response: any ): any {
      return camelCaseKeysDeep(response);
  }
}
