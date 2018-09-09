import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieService } from './movie.service';
import { KeyApiComponent } from './key-api/key-api.component';
import { KeyApiService } from './key-api.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { DecodeMovieSearch } from './mapper/decode-movie-search';


@NgModule({
  declarations: [
    AppComponent,
    MovieSearchComponent,
    KeyApiComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
      MovieService,
      KeyApiService,
      DecodeMovieSearch
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
