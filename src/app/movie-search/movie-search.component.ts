import { Component, OnInit } from '@angular/core';

import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  selectedMovie: Movie;
  movieName = '';

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  onSubmit(): void {
      this.movieService
      .getMovie(this.movieName)
      .subscribe(movie => {this.selectedMovie = movie; });
  }

  isDisabled(): boolean {
      return this.movieName.length === 0;
  }

}
