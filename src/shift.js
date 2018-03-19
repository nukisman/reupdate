/* Created by Alexander Nuikin (nukisman@gmail.com). */

import set from './set';

export default (srcArray, n = 1) => {
  if (n === 0) return srcArray;
  else {
    const srcHead = srcArray.slice(0, -n);
    const targetHead = srcArray.slice(n);
    return set(srcHead, targetHead);
  }
};
