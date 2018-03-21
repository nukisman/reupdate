/* Created by Alexander Nuikin (nukisman@gmail.com). */

import toPath from 'lodash.topath';

import set from './set';
import getAt from './getAt';
import replaceAt from './replaceAt';

export default (src, path, updater) => {
  const pathArray = toPath(path);
  const valueAt = getAt(src, pathArray);
  const target = updater(valueAt);
  const targetAt = set(valueAt, target);
  if (targetAt === valueAt) {
    /** Not changed at path */
    return src;
  } else {
    /** Changed at path |=> Immutable replace at path */
    return replaceAt(src, pathArray, targetAt);
  }
};
