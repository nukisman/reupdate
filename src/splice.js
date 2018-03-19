/* Created by Alexander Nuikin (nukisman@gmail.com). */

import set from './set';

export default (srcArray, atIndex, deleteCount, ...values) => {
  if (deleteCount === 0 && values.length === 0) return srcArray;
  else {
    const srcTail = srcArray.slice(atIndex);
    const targetTail = [...values, ...srcArray.slice(atIndex + deleteCount)];
    const tail = set(srcTail, targetTail);
    if (tail === srcTail) return srcArray;
    else {
      const head = srcArray.slice(0, atIndex);
      return [...head, ...tail];
    }
  }
};
