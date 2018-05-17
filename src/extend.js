/* Created by Alexander Nuikin (nukisman@gmail.com). */

import set from './set';

export default (src, extensionOrCreator) => {
  if (typeof src === 'object')
    if (Array.isArray(src))
      throw new TypeError('State is not an object but an array');

  let ext = extensionOrCreator;
  if (typeof extensionOrCreator === 'object') {
    if (Array.isArray(extensionOrCreator))
      throw new TypeError('Extension is not an object but an array');
  } else if (typeof extensionOrCreator === 'function')
    ext = extensionOrCreator(src);
  else throw new TypeError('Extension must be object of function');

  /** Both objects */
  const extNames = Object.getOwnPropertyNames(ext);
  if (extNames.length === 0) return src;
  else {
    let changedCount = 0;
    const changed = {};
    for (const k of extNames) {
      const newValue = set(src[k], ext[k]);
      if (src[k] !== newValue) {
        // console.log(k, state[k], newValue);
        changed[k] = newValue;
        changedCount++;
      }
    }
    // console.log(changedCount, { changed });
    if (changedCount > 0) return { ...src, ...changed };
    else return src;
  }
};
