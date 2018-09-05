import { Component, OnInit } from '@angular/core';

import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { KeyApiService } from '../key-api.service';

import StringUtil from '../util/string-util';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  movieList: Movie[];
  movieName = '';

  constructor(private movieService: MovieService,
              private keyApiService: KeyApiService) { }

  ngOnInit() {
  }

  onSubmit(): void {
      if ( StringUtil.isDefinedAndNotEmpty(this.movieName) && this.keyApiService.getOMDbKeyApi().isValid) {
          this.movieService
          .getMovies(this.movieName)
          .subscribe(movie => {this.movieList = movie.search; });
      }
  }

  isDisabled(): boolean {
      return this.movieName.length === 0;
  }

}
