import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { KeyApiService } from '../key-api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private keyApiService: KeyApiService) { }

  ngOnInit() {
      if (this.keyApiService.getOMDbKeyApi().isValid) {
          this.getMovie();
      }
  }

  getMovie(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.movieService.getMoviebyImdbId(id)
      .subscribe(movie => this.movie = movie );
  }
}
