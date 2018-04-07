/* Created by Alexander Nuikin (nukisman@gmail.com). */

import toPath from 'lodash.topath';

import replaceAt from './replaceAt';

export default (src, pathToArray, ...values) => {
  if (values.length === 0) return src;
  else {
    const keys = toPath(pathToArray);
    return replaceAt(src, keys, srcArray => [...values, ...srcArray]);
  }
};
