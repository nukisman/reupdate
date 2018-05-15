/* Created by Alexander Nuikin (nukisman@gmail.com). */

import toPath from 'lodash.topath';
import insert from './insert';
import replaceAt from './replaceAt';

export default (src, pathToArray, atIndex, ...values) => {
  if (values.length === 0) return src;
  else {
    const keys = toPath(pathToArray);
    return replaceAt(src, keys, srcArray => {
      if (srcArray.length === 0) return values;
      else return insert(srcArray, atIndex, ...values);
    });
  }
};
