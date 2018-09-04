import { Component, OnInit } from '@angular/core';

import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  movieList: Movie[];
  movieName = '';

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  onSubmit(): void {
      this.movieService
      .getMovies(this.movieName)
      .subscribe(movie => {this.movieList = movie.search; });
  }

  isDisabled(): boolean {
      return this.movieName.length === 0;
  }

}
