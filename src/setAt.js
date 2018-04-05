/* Created by Alexander Nuikin (nukisman@gmail.com). */

import toPath from 'lodash.topath';

import set from './set';
import getAt from './getAt';
import replaceAt from './replaceAt';

// todo: Option: Create intermediate objects
export default (src, path, target) => {
  const pathArray = toPath(path);
  const valueAt = getAt(src, pathArray);
  // console.log('valueAt === src:', valueAt === src, toPath(path));
  const targetAt = set(valueAt, target);
  if (targetAt === valueAt) {
    /** Not changed at path */
    return src;
  } else {
    /** Changed at path |=> Immutable replace at path */
    return replaceAt(src, pathArray, targetAt);
  }
};
