import * as _ from 'lodash';

export default class StringUtil {

  constructor() { }

  static isDefinedAndNotEmpty(value: string): boolean {
      return _.isString(value) && !_.isEmpty(value);
  }
}
