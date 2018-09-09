import { Component, OnInit, HostListener } from '@angular/core';

import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { KeyApiService } from '../key-api.service';
import { MovieSearch } from '../movie-search.model';

import StringUtil from '../util/string-util';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  private pageNumber = 1;
  private pageSize = 10;

  movieName = '';
  movieList: Movie[];
  isValidKey: boolean;
  movieSearch: MovieSearch;

  constructor(private movieService: MovieService,
              private keyApiService: KeyApiService) { }

  ngOnInit() {
      this.isValidKey = this.keyApiService.getOMDbKeyApi().isValid;
  }

  hasNextPage(): boolean {
      return this.pageNumber * this.pageSize <= this.movieSearch.totalResults;
  }

  private getNextPage(): number {
      return ++this.pageNumber;
  }

  private refreshPageProperties() {
      this.pageNumber = 1;
      this.pageSize = 10;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.hasNextPage()) {
        this.getMovies(this.movieName, this.getNextPage(), this.nextPageCall);
    }
  }

  onSubmit(): void {
      this.refreshPageProperties();
      if ( StringUtil.isDefinedAndNotEmpty(this.movieName) && this.keyApiService.isValidKey()) {
          this.getMovies(this.movieName, this.pageNumber, this.initialPageCall);
      }
  }

  private getMovies(movieName: string, pagesize: number, callback: (movieSearch: MovieSearch) => void): void {
      this.movieService
          .getMovies(movieName, pagesize)
          .subscribe(callback.bind(this));
  }

  isDisabled(): boolean {
      return this.movieName.length === 0;
  }

  private initialPageCall(currentMovieSearchResult: MovieSearch): void {
      this.movieSearch = currentMovieSearchResult;
      this.movieList = this.movieSearch.search;
  }

  private nextPageCall(currentMovieSearchResult: MovieSearch): void {
      const data = currentMovieSearchResult.search;
      for (let i = 0; i < data.length; i++) {
        this.movieList.push(data[i]);
      }
  }

}
