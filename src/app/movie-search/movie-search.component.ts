import { Component, OnInit, HostListener } from '@angular/core';

import { Movie } from '../movie';
import { PageAttributes } from '../model/search/page-attributes';
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

  movieName = '';
  movieList: Movie[];
  isValidKey: boolean;
  movieSearch: MovieSearch;
  wrapperObject: Object = new Object;
  searchPageAttributes: PageAttributes = new PageAttributes;

  constructor(private movieService: MovieService,
              private keyApiService: KeyApiService) { }

  ngOnInit() {
      this.isValidKey = this.keyApiService.getOMDbKeyApi().isValid;
      this.wrapperObject['search'] = [];
      this.wrapperObject['emptyNodes'] = [];
  }

  hasNextPage(): boolean {
      return this.searchPageAttributes.getPageNumber() * this.searchPageAttributes.getPageSize() <= this.movieSearch.totalResults;
  }

  private refreshPageProperties() {
      this.searchPageAttributes.setPageNumber(1);
      this.searchPageAttributes.setPageSize(10);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.hasNextPage()) {
         this.getMovies(this.movieName, this.searchPageAttributes.getNextPage(), this.nextPageCall);
    }
  }

  onSubmit(): void {
      this.refreshPageProperties();
      if ( StringUtil.isDefinedAndNotEmpty(this.movieName) && this.keyApiService.isValidKey()) {
          this.getMovies(this.movieName, this.searchPageAttributes.getPageNumber(), this.initialPageCall);
      }
  }

  getArraySize(pagesize: number, columnsize: number): number {
    let rowsize: number = Math.floor(pagesize / columnsize);
    if ( rowsize * columnsize < pagesize) {
        rowsize++;
    }
    return rowsize * columnsize;
  }

  getRearrangedArray(currentArray, columnsize: number): any {
      const currentArraySize: number = currentArray.length - 1;
      const arraySize: number = this.getArraySize(currentArray.length, 3);
      const arrayLastIndex: number = arraySize - 1;
      const rowSize: number = arraySize / columnsize ;
      let newLocation: number;
      const newArray: Array<object> = [];
      newArray[0] = currentArray[0];
      for ( let i = 1; i < arrayLastIndex; i++) {
         newLocation = i * rowSize;
         if ( newLocation > arrayLastIndex) {
            newLocation -= (arrayLastIndex * Math.floor( newLocation / arrayLastIndex ));
         }
         this.assignValue(i, newArray, currentArray, newLocation);
         console.log(newLocation);
      }
      this.assignValue(arrayLastIndex, newArray, currentArray, arrayLastIndex);
      this.wrapperObject['search'] =  newArray;
      console.log(newArray);
      console.log(this.wrapperObject);
      return newArray;
  }

  assignValue(index: number, newArray: Array<object>, currentArray: Array<object>, newLocation: number): void {
         if (currentArray[index]) {
             newArray[newLocation] = currentArray[index];
         } else {
             newArray[newLocation] = currentArray[0];
             this.wrapperObject['emptyNodes'].push(newLocation);
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
      this.getRearrangedArray(this.movieSearch.search, this.searchPageAttributes.getColumnSize());
      this.movieList = this.wrapperObject['search'];
  }

  private nextPageCall(currentMovieSearchResult: MovieSearch): void {
      const data = currentMovieSearchResult.search;
      // for (let i = 0; i < data.length; i++) {
      // this.movieList.push(data[i]);
      // }
      this.reOrder(data);
  }

  reOrder(data: Movie[]): void {
      const array = this.wrapperObject['emptyNodes'];
      const existingObject = this.wrapperObject['search'];
      let emptyIndex;
      for (let i = 0; i < array.length; i++) {
        emptyIndex = array[i];
        existingObject[emptyIndex] = data.pop();
      }
      this.wrapperObject['emptyNodes'] = [];
  }

}
