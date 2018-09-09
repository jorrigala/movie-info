import { Injectable } from '@angular/core';

import { MovieSearch } from '../movie-search.model';
import * as _ from 'lodash';

@Injectable()
export class DecodeMovieSearch {

    decodeMovieSearch (movieSearchModel: MovieSearch): MovieSearch {
      return Object.assign({}, movieSearchModel, {
        response: function() {
            const responseLowerCase = _.toLower(movieSearchModel.response);
            if (responseLowerCase === 'true') {
                return true;
            } else {
                return false;
            }
        }(),
        totalResults: function() {
            return +movieSearchModel.totalResults;
        }()
      });
    }
}
