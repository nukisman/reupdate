/* Created by Alexander Nuikin (nukisman@gmail.com). */

import set from './set';

export default (state, ext) => {
  if (typeof state === 'object' && typeof ext === 'object') {
    if (Array.isArray(state))
      throw new TypeError('State is not an object but an array');
    if (Array.isArray(ext))
      throw new TypeError('Extension is not an object but an array');

    /** Both objects */
    const extNames = Object.getOwnPropertyNames(ext);
    if (extNames.length === 0) return state;
    else {
      let changedCount = 0;
      const changed = {};
      for (const k of extNames) {
        const newValue = set(state[k], ext[k]);
        if (state[k] !== newValue) {
          // console.log(k, state[k], newValue);
          changed[k] = newValue;
          changedCount++;
        }
      }
      // console.log(changedCount, { changed });
      if (changedCount > 0) return { ...state, ...changed };
      else return state;
    }
  }
};
