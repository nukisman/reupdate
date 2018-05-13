/* Created by Alexander Nuikin (nukisman@gmail.com). */

import toPath from 'lodash.topath';
import replaceAt from './replaceAt';
import splice from './splice';

export default (src, pathToArray, atIndex, deleteCount, ...values) => {
  if (deleteCount === 0 && values.length === 0) return src;
  else {
    const keys = toPath(pathToArray);
    return replaceAt(src, keys, srcArray =>
      splice(srcArray, atIndex, deleteCount, ...values)
    );
  }
};
