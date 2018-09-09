import { Injectable } from '@angular/core';

import { MovieSearch } from '../movie-search.model';
import { Movie } from '../movie';
import * as _ from 'lodash';

@Injectable()
export class MovieSearchMapper {

    public isValidResponse(movieSearchModel: MovieSearch): boolean {
        const responseLowerCase = _.toLower(movieSearchModel.response);
        if (responseLowerCase === 'true') {
            return true;
        } else {
            return false;
        }
    }

    decodeMovieSearch (movieSearchModel: MovieSearch): MovieSearch {
      const isValidRespnose = this.isValidResponse(movieSearchModel);
      return Object.assign({}, movieSearchModel, {
        response: isValidRespnose,
        totalResults: function() {
            return +movieSearchModel.totalResults;
        }(),
        search: function() {
            if (isValidRespnose) {
                const movies = movieSearchModel.search;
                let currentMovie: Movie;
                for (let i = 0; i < movies.length ; i++) {
                    currentMovie = movies[i];
                    if (currentMovie.poster.toString() === 'N/A') {
                        currentMovie.poster = new URL('https://via.placeholder.com/350x550');
                    }
                }
                return movies;
            }
        }()
      });
    }
}
