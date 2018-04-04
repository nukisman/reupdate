/* Created by Alexander Nuikin (nukisman@gmail.com). */

import toPath from 'lodash.topath';

import getAt from './getAt';
import replaceAt from './replaceAt';

export default (src, path) => {
  const p = toPath(path);
  const current = getAt(src, p);
  if (current === undefined) return src;
  else return replaceAt(src, p, undefined);
};
