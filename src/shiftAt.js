/* Created by Alexander Nuikin (nukisman@gmail.com). */

import set from './set';
import replaceAt from './replaceAt';
import toPath from 'lodash.topath';

export default (src, pathToArray, n = 1) => {
  if (n === 0) return src;
  else {
    const keys = toPath(pathToArray);
    return replaceAt(src, keys, srcArray => {
      const srcHead = srcArray.slice(0, -n);
      const targetHead = srcArray.slice(n);
      return set(srcHead, targetHead);
    });
  }
};
