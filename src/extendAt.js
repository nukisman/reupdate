/* Created by Alexander Nuikin (nukisman@gmail.com). */

import toPath from 'lodash.topath';

import getAt from './getAt';
import replaceAt from './replaceAt';
import extend from './extend';

const extendAt = (src, pathToObject, extensionOrCreator) => {
  const pathArray = toPath(pathToObject);
  // console.log({ path, pathArray });
  const valueAt = getAt(src, pathArray);
  // console.log('valueAt === src:', valueAt === src, pathArray);
  const targetAt = extend(valueAt, extensionOrCreator);
  // console.log({ valueAt, targetAt, pathArray });
  if (targetAt === valueAt) {
    /** Not changed at path */
    return src;
  } else {
    /** Changed at path |=> Immutable replace at path */
    return replaceAt(src, toPath(pathToObject), targetAt);
  }
};

export default extendAt;
